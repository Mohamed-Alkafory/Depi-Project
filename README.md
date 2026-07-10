<div align="center">

<br/>

<pre>
 ████╗      ████╗         █████████╗         ████╗         ████╗      ████╗
 ████║      ████║       ████╔════████╗       ██████╗     ██████║      ████║
 ███████████████║       ████║    ████║       ████████╗ ████████║      ████║
 ████╔══════████║       ████║    ████║       ████╔████████╔████║      ████║
 ████║      ████║       ╚████████████╔╝      ████║ ╚████╔╝ ████║      ████║
 ╚═══╝      ╚═══╝        ╚═══════════╝       ╚═══╝  ╚═══╝  ╚═══╝      ╚═══╝
</pre>

### _HOMI — Architectural House Plans & Construction Cost Platform_

<p>
  <strong>Discover, compare, and purchase architectural house plans — and estimate your construction budget — all in one place.</strong>
</p>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-hommi--app.vercel.app-c9a96e?style=for-the-badge)](https://hommi-app.vercel.app/)
[![Repo](https://img.shields.io/badge/📂_Repository-Depi--Project-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shehabhany4/Depi-Project)

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
<br/>
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-TanStack-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State-20232a?style=for-the-badge&logo=react&logoColor=white)
<br/>
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-Forms-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Validation-3068b7?style=for-the-badge&logo=zod&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
<br/>
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Components-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-161618?style=for-the-badge&logo=radixui&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)

</div>

<br/>

---

## 📖 Overview

**HOMI** is a modern, full-stack platform built to simplify the process of discovering architectural house plans and estimating construction costs. Rather than functioning as just another property listing site, HOMI delivers an interactive experience where users can explore professionally designed house plans, compare specifications side by side, estimate project budgets, and manage their favorite plans — all from a single, polished interface.

The platform pairs a premium, animation-rich user experience with a powerful admin dashboard for complete management of plans, orders, and site content, making it a production-ready foundation for real-world deployment.

## 🎯 The Problem

Choosing a house design and estimating its construction cost is usually a fragmented process — buyers browse multiple websites, compare plans manually, and reach for external tools just to calculate a rough budget.

**HOMI solves this by bringing the entire journey into one platform**, where users can:

- 🏘️ Browse categorized house plans
- 📋 View detailed technical specifications
- 🧮 Estimate construction costs instantly
- ❤️ Save favorite plans for later
- 🛒 Purchase architectural plans
- 📩 Contact the team directly

<br/>

## 🎭 User & Admin Experience

The application is divided into two core experiences: the **Public / Customer Flow** and the **Administrator Flow**.

### 👤 Public & Customer Experience

- **Landing Page** — A cinematic landing experience with GSAP ScrollTrigger animations that walk visitors through the construction journey, from foundation to finished home.
- **Browse House Plans** — Explore a growing collection of architectural plans, filterable by category, price, area, bedrooms, bathrooms, floors, garage, and style, with curated *Featured Plans*.
- **Plan Details** — Every plan includes a high-quality cover image, exterior and interior galleries, floor plans, an additional media gallery, technical specifications, a detailed description, and a features list.
- **Construction Cost Estimator** — An interactive calculator that estimates construction costs based on a plan's specifications and any custom selections.
- **Favorites** — Authenticated users can save preferred plans for later comparison.
- **Shopping Cart & Checkout** — Add multiple plans to the cart and complete a secure checkout with customer name, phone, address, payment method, and order notes — all persisted in Supabase.
- **Authentication** — Secure sign-up and login via Supabase, supporting both **Email & Password** and **Google Authentication**. User roles are assigned automatically and securely on the server — there is no client-side role selection.
- **Contact & About** — A dedicated contact form for direct inquiries, plus an About page presenting HOMI's vision, mission, and construction philosophy.
- **Gallery** — A visually rich showcase of completed architectural projects and design inspiration.

### 🛡️ Admin Experience

Administrators are identified through secure, server-side validation and get full control over the platform via a protected `/admin` dashboard:

- **Plan Management** — Create, edit, delete, and duplicate plans; upload and organize multiple categorized images; manage full plan specifications and galleries.
- **Order Management** — View all customer orders with customer details, purchased plan, order status, and payment information.
- **Content Management** — Foundations in place for managing testimonials, website settings, contact messages, and categories.

<br/>

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Secure Authentication** | Supabase Auth with Email/Password & Google sign-in, server-side role assignment, and protected routes. |
| 🏠 **Architectural Plan Catalog** | Rich, filterable catalog of house plans with detailed specs, galleries, and floor plans. |
| 🧮 **Construction Cost Estimator** | Interactive, real-time cost estimation based on selected plan specifications. |
| 🛒 **E-commerce Flow** | Full cart, checkout, and order tracking experience backed by Supabase. |
| 🎛️ **Admin Dashboard** | Dedicated, secure admin area for managing plans, orders, and content. |
| 🎨 **Modern UI/UX** | Glassmorphism-inspired design with Tailwind CSS, Shadcn UI, Framer Motion, and GSAP. |
| 📱 **Fully Responsive** | Mobile-first design optimized across phones, tablets, and desktops. |
| ⚡ **Blazing Fast** | Built on Vite + React 19 for rapid development and optimized production builds. |

<br/>

## 🛠️ Tech Stack

<div align="center">

| Layer | Technologies |
|---|---|
| **Core** | React 19 · Vite · JavaScript (ES6+) · React Router v7 |
| **Styling & UI** | Tailwind CSS v4 · Shadcn UI · Radix UI · Framer Motion · GSAP ScrollTrigger |
| **State & Data** | TanStack React Query (server state) · Zustand (global state) |
| **Forms & Validation** | React Hook Form · Zod |
| **Backend & Database** | Supabase · PostgreSQL · Supabase Auth · Supabase Storage · Row Level Security (RLS) |
| **Icons & Typography** | Lucide React · @fontsource-variable/geist |
| **Notifications** | Sonner |

</div>

<br/>

## 🗄️ Database

The backend runs on **Supabase PostgreSQL**, following a relational design with foreign keys and Row Level Security (RLS) on every table.

**Main entities:** Profiles · Categories · Plans · Plan Images · Plan Features · Favorites · Cart · Orders · Contact Messages · Inquiries · Testimonials · Settings

<br/>

## 📂 Project Structure

```text
src/
├── assets/       # Static files (images, icons, etc.)
├── components/   # Shared/UI components (e.g., Shadcn UI, generic buttons, inputs)
├── features/     # Feature-based modules (Auth, Cart, Orders, Plans, Profile, etc.)
├── hooks/        # Custom reusable React hooks
├── lib/          # Utilities and configurations (Supabase client, clsx utils, etc.)
├── pages/        # Route-level page components (Home, Checkout, Admin, etc.)
├── router/       # React Router setup and route definitions
├── styles/       # Global CSS and styling configurations
├── App.jsx       # Main application entry point
└── main.jsx      # React DOM rendering
```

Each feature module is self-contained with its own **components, hooks, services, validation, and business logic** — improving scalability, maintainability, reusability, and overall code cleanliness.

<br/>

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shehabhany4/Depi-Project.git
   cd Depi-Project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

<br/>

## 🧑‍💻 Workflow & Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local development server with Hot Module Replacement (HMR). |
| `npm run build` | Compiles the application for production deployment. |
| `npm run preview` | Previews the built production app locally. |
| `npm run lint` | Analyzes the code for ESLint errors and warnings to maintain code quality. |

<br/>

## 🔮 Future Enhancements

- 💳 Online payment integration (Stripe)
- 🤖 AI-powered construction cost estimation
- 📊 Admin analytics dashboard
- 🌍 Multi-language support
- 📄 PDF blueprint downloads
- 📦 Customer order tracking
- 📧 Email notifications

<br/>

## 🎯 Project Goal

HOMI demonstrates how modern web technologies can be combined to build a **scalable, production-ready platform** for architectural plan management and construction estimation — emphasizing clean architecture, responsive design, secure authentication, optimized database design, and an engaging user experience suitable for real-world deployment.

<br/>

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shehabhany4/Depi-Project/issues) if you'd like to contribute.

## 📝 License

This project is licensed under the **ISC License**.

<br/>

<div align="center">

Made with ❤️ by the HOMI Team

</div>
