const axios = require("axios");
const EVENT = require("../models/event");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper: Safely parse dates
function parseDate(dateStr, fallback = null) {
  if (!dateStr) return fallback;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? fallback : d;
}

// Helper: Extract Stipend/Salary from the specific JSON structure provided
function getStipendString(jobDetail) {
  if (!jobDetail) return "Not Disclosed";

  // 1. Check strict Unpaid status
  if (jobDetail.paid_unpaid === "unpaid") {
    return "Unpaid";
  }

  // 2. Check if salary is hidden (show_salary: 0)
  if (jobDetail.paid_unpaid === "paid" && jobDetail.show_salary === 0) {
    return "Paid (Not Disclosed)";
  }

  // 3. Check for specific numbers if visible
  if (jobDetail.min_salary || jobDetail.max_salary) {
    const min = jobDetail.min_salary || 0;
    const max = jobDetail.max_salary || 0;
    if (min === max) return `₹${min}/month`;
    return `₹${min} - ₹${max}/month`;
  }

  return "Paid";
}

async function fetchUnstopInternships() {
  console.log("[FETCHER] Starting Unstop internship fetch loop...");

  try {
    let page = 1;
    let keepFetching = true;
    let totalFetched = 0;
    const perPage = 10;
    const maxPages = 150;

    while (keepFetching && page <= maxPages) {
      const API_URL = `https://unstop.com/api/public/opportunity/search-result?opportunity=internships&page=${page}&per_page=${perPage}&oppstatus=open`;
      
      console.log(`[FETCHER] Fetching page ${page}...`);
      
      const response = await axios.get(API_URL);
      const internships = response.data?.data?.data;

      if (!internships || internships.length === 0) {
        console.log(`[FETCHER] No more internships found. Stopping at page ${page}.`);
        keepFetching = false;
        continue;
      }

      const operations = internships.map(internship => {
        const externalId = internship.id.toString();

        // 1. URL: Use 'seo_url' if available (it is absolute in your JSON)
        let link = internship.seo_url || internship.public_url;
        if (link && !link.startsWith("http")) {
          link = `https://unstop.com/${link}`;
        }

        // 2. REGISTRATION DEADLINE (When apps close)
        // usage of 'end_date' (e.g., "2026-01-09...")
        const regDeadline = parseDate(internship.end_date || internship.regnRequirements?.end_regn_dt);

        // 3. EVENT DATE (When internship starts)
        // Your JSON usually lacks 'start_date'. 
        // Logic: Try to find a real start date. If missing, fallback to Deadline 
        // (so it shows as "Upcoming" until applications close).
        const rawStartDate = internship.start_date || internship.execution_date || internship.jobDetail?.start_date;
        const eventDate = parseDate(rawStartDate, regDeadline);

        // 4. LOCATION
        let location = "Remote";
        if (internship.jobDetail?.type === 'wfh' || internship.region === 'online') {
          location = "Work From Home";
        } else if (internship.jobDetail?.locations?.length > 0) {
          location = internship.jobDetail.locations.join(', ');
        } else if (internship.jobDetail?.type === 'in_office') {
            location = "In Office"; // Fallback if location array is empty but type is office
        }

        // 5. BANNER & LOGO
        const bannerURL = internship.seo_details?.[0]?.sharable_image_url || internship.banner_mobile?.image_url || null;
        // Use root logoUrl2 (150x150) or organization logo
        const logoURL = internship.logoUrl2 || internship.organisation?.logoUrl2;

        // 6. DESCRIPTION
        const description = internship.details || internship.seo_details?.[0]?.description || "No Description";
        
        // 7. STIPEND
        const stipend = getStipendString(internship.jobDetail);

        return EVENT.findOneAndUpdate(
          { externalId: externalId },
          {
            $set: {
              externalId: externalId,
              title: internship.title,
              platform: "Unstop",
              type: "Internship",
              link: link,
              eventDate: eventDate,            
              registrationDeadline: regDeadline, 
              duration: "Not Disclosed",
              location: location,
              bannerURL: bannerURL,
              mode: location === "Work From Home" ? "Online" : "Offline",
              tags: internship.filters?.map(tag => tag.name) || [],
              logoURL: logoURL,
              description: description,
              organizationName: internship.organisation?.name || "Unstop",
              stipend: stipend,
            }
          },
          { upsert: true, new: true }
        );
      });

      await Promise.all(operations);
      totalFetched += internships.length;
      
      await sleep(1000); // Politeness delay
      page++;
    }
    console.log(`[FETCHER] Finished. Total events: ${totalFetched}`);

  } catch (error) {
    console.error("[FETCHER] Critical Error:", error.message);
  }
}

module.exports = fetchUnstopInternships;