const axios = require("axios");
const EVENT = require("../models/event"); // Make sure this path is correct

// This helper function is the same as before
function getStipendString(jobDetail) {
  if (jobDetail?.stipend?.stipend_type === "unpaid" || jobDetail?.internship_type === "Unpaid") {
    return "Unpaid";
  }
  if (jobDetail?.not_disclosed) {
    return "Not Disclosed";
  }
  if (jobDetail?.stipend?.min_stipend && jobDetail?.stipend?.max_stipend) {
    return `₹${jobDetail.stipend.min_stipend} - ₹${jobDetail.stipend.max_stipend}/month`;
  }
  if (jobDetail?.stipend?.min_stipend) {
    return `₹${jobDetail.stipend.min_stipend}/month`;
  }
  if (jobDetail?.isPaid) {
    return "Paid";
  }
  return "Not Disclosed"; // Default fallback
}

// This is the new fetcher function with a loop
async function fetchUnstopInternships() {
  console.log("[FETCHER] Starting Unstop internship fetch loop...");
  try {
    let page = 1;
    let keepFetching = true;
    let totalFetched = 0;
    const perPage = 10; // The API seems to force 10
    const maxPages = 50;  // We will fetch 10 pages (10 * 10 = 100 internships)

    // Loop until we run out of pages or hit our max limit
    while (keepFetching && page <= maxPages) {
      
      // 1. Create the API URL for the current page
      const API_URL = `https://unstop.com/api/public/opportunity/search-result?opportunity=internships&page=${page}&per_page=${perPage}&oppstatus=open`;
      
      console.log(`[FETCHER] Fetching page ${page} of Unstop internships...`);
      
      const response = await axios.get(API_URL);
      const internships = response.data.data.data;

      // 2. Check if the API returned an empty page
      if (!internships || internships.length === 0) {
        console.log(`[FETCHER] No more internships found. Stopping at page ${page}.`);
        keepFetching = false;
        continue; // Stops the loop
      }

      // 3. Process the 10 internships we just got
      const operations = internships.map(internship => {
        const externalId = internship.id.toString(); 
        const link = internship.seo_url;
        const logoURL = internship.logoUrl2 || internship.logo_path;
        const bannerURL = internship.seo_details?.[0]?.sharable_image_url || internship.banner_mobile?.image_url || null;
        const tags = internship.filters?.map(tag => tag.name) || [];
        const location = internship.jobDetail?.locations?.join(', ') || null;
        const mode = internship.region === 'online' || internship.jobDetail?.type === 'work_from_home' ? 'Online' : 'Offline';
        const organizationName = internship.organisation?.name || null;
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
              eventDate: new Date(internship.start_date), 
              registrationDeadline: new Date(internship.regnRequirements?.end_regn_dt),
              duration:"Not Disclosed",
              location: location,
              bannerURL: bannerURL,
              mode: mode,
              tags: tags,
              logoURL: logoURL,
              description: internship.seo_details?.[0]?.description || "No Description",
              organizationName: organizationName,
              stipend: stipend,
            }
          },
          { upsert: true } 
        );
      });

      // 4. Wait for the 10 events to save, then move to the next page
      await Promise.all(operations);
      totalFetched += internships.length;
      page++; // Go to the next page
    }

    console.log(`[FETCHER] Successfully fetched and upserted ${totalFetched} total events from Unstop over ${page - 1} pages.`);

  } catch (error) {
    console.error("[FETCHER] Error fetching Unstop events:", error.message);
    if (error.response) {
      console.error("Unstop API Response Status:", error.response.status);
    }
  }
}

module.exports = fetchUnstopInternships;