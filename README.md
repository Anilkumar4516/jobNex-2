# JobNex 2.0 - "Your Next Job, Smarter!"

Production-grade full-stack career platform designed from comprehensive functional specifications, featuring AI job discovery, automated application dispatch, real-time interview simulator, skill gap diagnostics, and cold referral outreach.

---

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router, React 18, TypeScript), Tailwind CSS, Lucide React
- **Backend / APIs**: Modular Next.js Route Handlers (`src/backend/controllers` & `src/backend/services`)
- **Database / ORM**: PostgreSQL with Prisma ORM (with `pgvector` extensions for semantic matching)
- **Asynchronous Workers**: Redis & BullMQ queue architecture for auto-apply and email outreach
- **AI Integrations**: Gemini / OpenAI / Claude career assistant, sequential interview grading rubric, cold referral pitch generation
- **State Management**: Reactive JobNexContext with localStorage persistence and live Role Switcher

---

## 📦 Features & Modules (Matching Wireframes)

1. **Homepage & Global Discovery (`/`)**: Global hero search bar, Region and Experience dropdowns, Featured Jobs grid with package details in LPA/USD, and AI Assistant launch widget.
2. **Authentication & Multi-Role Access Control (`/login`, `/signup`)**: Credentials auth + 1-click test role switcher (`Job Seeker`, `Recruiter`, `Admin`) and social OAuth.
3. **Faceted Job Search & Filtering (`/jobs`)**: Dynamic keyword parsing, Region filters (US, Global, India, Bangladesh), Experience (Fresher, 1-2 yrs, 3-5 yrs, 5+ yrs), Certifications, Multi-select Skills, and 1-Click Instant Apply Modal.
4. **Conversational AI Career Chatbot (`/ai-assistant`)**: Interactive chat interface with quick suggestion chips and deep linking to targeted jobs and courses.
5. **AI Technical & HR Interview Simulator (`/interview-prep`)**: Sequential questions (1 to 5), Speech-to-text voice input simulation, and real-time AI rubric scorecard (Accuracy, Clarity, Relevance, and Actionable feedback).
6. **Skill Gap Diagnostics & Course Recommendations (`/skill-gap`)**: Interactive mastery percentage progress bars, missing skill badges, and curated course cards (Coursera, Udemy, edX).
7. **Centralized ATS Dashboard (`/dashboard`)**: Application management tabs (`All`, `Applied`, `Interview`, `Rejected`, `Offered`), data table, and slide-out timeline drawer detailing stage history.
8. **Automated Job Application Engine (`/auto-apply`)**: Preference setup, minimum match threshold slider (e.g. Min 70%), attached resume selector, and live batch runner with audit logs.
9. **Cold Referral Outreach Tool (`/cold-referral`)**: AI-generated tailored cold emails citing candidate strengths, attached resume, and dispatch delivery status tracker.
10. **Resume & Granular Privacy Management (`/resume-privacy`)**: Drag-and-drop resume uploader, inline document preview, Public vs Private access, and personal detail masking (phone/email/current employer).

---

## 🛠️ Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run Prisma generation (optional for DB schema)
npx prisma generate

# 3. Start development server
npm run dev

# 4. Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
