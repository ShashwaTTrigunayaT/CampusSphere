# CampusSphere: The Centralized Academic Event Aggregator

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/Status-Live-brightgreen)
![AI](https://img.shields.io/badge/Powered%20By-Groq-orange)

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

**AI & Database:** ![Groq](https://img.shields.io/badge/Groq-LPU%20Inference-orange?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?style=for-the-badge)

---

## 📖 Table of Contents
- [Executive Summary](#-executive-summary)
- [The Problem](#-the-problem)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Environment Variables](#-environment-variables)
- [Contact](#-contact)

---

## 🚀 Executive Summary

**CampusSphere** is a full-stack web application designed to streamline the academic opportunity search. It serves as a unified dashboard that aggregates **Hackathons, Internships, Workshops, and Coding Contests** from various disparate platforms into a single, real-time feed.

Beyond simple aggregation, it introduces intelligent features like **AI-Generated Winning Strategies**, **Resume Matching**, and **Automated Deadline Alerts**, ensuring students never miss an opportunity that matches their skill set.

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

### 1. 🧠 CampusSphere AI (Strategy Engine)
* **Powered by Groq:** Leverages high-speed LLM inference to analyze opportunities in real-time.
* **Gap Analysis:** The AI compares the specific requirements of an event (e.g., "AI Hackathon looking for GenAI solutions") against the user's parsed resume skills.
* **Actionable Roadmaps:** Generates a personalized, step-by-step preparation strategy (e.g., "Learn LangChain in 3 days," "Focus on these specific LeetCode patterns") to help the user win.

### 2. 🔍 Global Search Engine (Regex + Debounce)
* **Unified Search:** Perform partial string matching across Event Titles, Locations, and Tags simultaneously.
* **Performance:** Implements a **Debounce mechanism (500ms)** to prevent API flooding and reduce server load by ~90% during typing.

### 3. 📄 The "Smart Matcher" (Resume Parsing)
* **Input:** Users upload their resume (PDF).
* **Processing:** The backend parses text using `pdf-parse` to extract technical keywords (e.g., "React", "Python", "ML").
* **Matching:** Calculates a **"Match Score"** against active event tags to prioritize the most relevant opportunities for that specific user.

### 4. 🛡️ T-Minus Protocol (Proximity Alerts)
* **Automation:** Uses **Nodemailer** to transmit secure email alerts exactly **24 hours** and **120 minutes** before an event launch.
* **Proactive Defense:** Specifically designed to ensure users have enough time for system setup and final checks before a contest begins.

### 5. 📂 The Secure Vault (Bookmarks & Calendar)
* **Persistence:** One-click archival of events for future deployment.
* **One-Click Calendar:** Generates `.ics` files using JavaScript Blobs for instant Google Calendar sync.

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
