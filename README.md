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

### _Homi — Modern E-commerce & Subscription Platform_

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-depi--project.vercel.app-c9a96e?style=for-the-badge)](#)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge&logo=vite&logoColor=white)
<br/>
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![React Query](https://img.shields.io/badge/React_Query-TanStack-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State-20232a?style=for-the-badge&logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
<br/>
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Components-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-Primitives-161618?style=for-the-badge&logo=radixui&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-Validation-3068b7?style=for-the-badge&logo=zod&logoColor=white)

</div>

<br />

## 📖 Overview

**Homi** is a comprehensive web application featuring robust authentication, product/plan management, e-commerce functionalities, and a fully-featured Admin panel. The project adopts a scalable, feature-based architecture, ensuring maintainability and clean code separation. It is designed to provide a seamless experience for both end-users and administrators.

## 🎭 User & Admin Experience (How It Works)

The application is divided into two main experiences: **Customer (User) Flow** and **Administrator Flow**.

### 👤 User Experience

End-users enjoy a smooth, intuitive, and modern interface designed for fast browsing and secure transactions.

- **Browsing & Discovery**: Users can browse the catalog of plans/products, use the **Cost Calculator** to estimate expenses, and explore the 'About' and 'Contact' pages without needing an account.
- **Authentication**: Seamless Sign Up / Log In powered by Supabase, including magic links and secure session management.
- **Shopping & Subscriptions**:
  - Add items to the **Cart** and proceed through a streamlined **Checkout** process.
  - Save items to **Favorites** for later.
  - Subscribe to various **Plans** with dynamic pricing.
- **User Dashboard**: Users have a personalized **Profile** where they can manage their details, track **Orders** (status, history, invoices), and manage active subscriptions.

### 🛡️ Admin Experience

Administrators have access to a secure, hidden dashboard to oversee operations and manage content.

- **Secure Access**: The `/admin` routes are strictly protected. Only users with admin privileges can access this area.
- **Product & Plan Management**: Admins can easily add, edit, or remove products and subscription plans from the database.
- **Order Processing**: A dedicated interface to view incoming orders, update their fulfillment status, and track revenue.
- **User Management**: Oversee registered users, handle support requests, and manage access roles.

## ✨ Key Features

- **🔐 Secure Authentication**: Integrated with Supabase Auth for seamless user sign-up, login, and protected routes.
- **🛒 E-commerce & Subscriptions**: Full shopping cart functionality, checkout process, order tracking, and subscription plan management.
- **🎨 Modern UI/UX**: Stunning interface built with Tailwind CSS, Shadcn UI, and Framer Motion for buttery-smooth micro-animations.
- **🎛️ Admin Dashboard**: Dedicated secure admin area for managing products, orders, and users.
- **📱 Fully Responsive**: Optimized for a flawless experience across all devices, from mobile phones to large desktop screens.
- **🧮 Cost Calculator**: Dynamic, interactive tools to estimate costs based on selected plans and custom features.
- **⚡ Blazing Fast**: Powered by Vite and React 19 for rapid development and highly optimized production builds.

## 🛠️ Tech Stack

### Core

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)

### Styling & UI

- **CSS Framework**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & `tw-animate-css`
- **Typography**: `@fontsource-variable/geist`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### State Management & Data Fetching

- **Server State**: [TanStack React Query](https://tanstack.com/query/latest)
- **Global State**: [Zustand](https://zustand-demo.pmnd.rs/)

### Forms & Validation

- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Schema Validation**: [Zod](https://zod.dev/)

### Backend & Database

- **BaaS**: [Supabase](https://supabase.com/) (PostgreSQL, Authentication, Edge Functions)

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

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shehabhany4/Depi-Project.git
   cd Depi-Project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 🧑‍💻 Workflow & Scripts

- `npm run dev`: Starts the local development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles the application for production deployment.
- `npm run preview`: Previews the built production app locally.
- `npm run lint`: Analyzes the code for ESLint errors and warnings to maintain code quality.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/shehabhany4/Depi-Project/issues) if you want to contribute.

## 📝 License

This project is licensed under the **ISC License**.
