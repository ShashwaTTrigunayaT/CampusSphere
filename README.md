# 🌐 CampusSphere: The Centralized Academic Event Aggregator

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/Status-Live-brightgreen)
![Users](https://img.shields.io/badge/Active%20Users-50%2B-orange)

> **Eliminating information fragmentation for student developers by aggregating Hackathons, Internships, and Contests into a single, intelligent dashboard.**

---

## 🛠 Tech Stack

**Frontend:** ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Context API](https://img.shields.io/badge/Context--API-State_Management-blue?style=for-the-badge)

**Backend:** ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemailer](https://img.shields.io/badge/Nodemailer-SMTP-green?style=for-the-badge)

**Database:** ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?style=for-the-badge)

---

## 📖 Table of Contents
- [Executive Summary](#-executive-summary)
- [The Problem](#-the-problem)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Contact](#-contact)

---

## 🚀 Executive Summary

**CampusSphere** is a full-stack web application designed to streamline the academic opportunity search. It serves as a unified dashboard that aggregates **Hackathons, Internships, Workshops, and Coding Contests** from various disparate platforms into a single, real-time feed.

Beyond simple aggregation, it introduces intelligent features like **AI-based Resume Matching** and **Automated Deadline Alerts**, ensuring students never miss an opportunity that matches their skill set.

**Live Demo:** https://campus-sphere-beta.vercel.app/ 


---

## ⚡ The Problem

The academic ecosystem is currently fragmented. Students are forced to visit multiple different websites daily to stay updated on different types of opportunities:

| Opportunity Type | The Pain Point |
| :--- | :--- |
| **Coding Contests** | Scattered schedules across different providers & time zones. |
| **Hackathons** | Manual filtering required to find relevant stacks. |
| **Internships** | High noise-to-signal ratio on general job boards. |
| **University Fests** | Registration deadlines are frequently missed due to lack of alerts. |

**The Result:** Students miss valuable opportunities and waste time manually tracking 5+ different sites every day.

---

## ✨ Key Features

### 1. 🔍 Global Search Engine (Regex + Debounce)
* **Unified Search:** Perform partial string matching across Event Titles, Locations, and Tags simultaneously.
* **Performance:** Implements a **Debounce mechanism (500ms)** to prevent API flooding and reduce server load by ~90% during typing.

### 2. 📄 The "Smart Matcher" (Resume Parsing)
* **Input:** Users upload their resume (PDF).
* **Processing:** The backend parses text using `pdf-parse` to extract technical keywords (e.g., "React", "Python", "ML").
* **Matching:** Calculates a **"Match Score"** against active event tags to prioritize the most relevant opportunities for that specific user.

### 3. 🤖 Automated Data Normalization
* **Custom Fetchers:** Backend services aggregate and normalize incoming data from external sources into a standard schema (converting various formats to ISO 8601).
* **Consistency:** Ensures a global coding contest looks consistent next to a university hackathon card.

### 4. 📅 Productivity Tools
* **One-Click Calendar:** Generates `.ics` files using JavaScript Blobs for instant Google Calendar sync.
* **Email Alerts:** Uses **Nodemailer** to send automated reminders 24 hours before registration deadlines.

---

## 🏗 System Architecture



[Image of Service Oriented Architecture diagram]


CampusSphere uses a **Service-Oriented Architecture (SOA)** to decouple data fetching from user interactions.

1.  **User Request:** User searches for "Hackathon in Delhi".
2.  **API Gateway:** Frontend hits `GET /api/events`.
3.  **Controller Logic:** Node.js constructs a MongoDB Aggregation Pipeline.
4.  **Database Query:** MongoDB executes Regex search with Pagination.
5.  **Render:** React maps JSON response to Glassmorphism UI components.

---

## 🛠 Getting Started

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v16+)
* MongoDB Atlas Connection URI

### 1. Clone the Repository
```bash
git clone [https://github.com/ShashwaTTrigunayaT/campussphere.git](https://github.com/ShashwaTTrigunayaT/campussphere.git)
cd campussphere
