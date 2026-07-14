# Job Application Tracker

A simple, responsive job application tracker built with React, HTML, and CSS.

## Features

- Sign Up / Sign In with localStorage-based auth
- Dashboard with total applications count
- Add, edit, and delete job applications
- Search by company or job title
- Filter by platform and status
- Responsive layout for desktop, tablet, and mobile

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     # UI components (Navbar, SignIn, SignUp, Dashboard, etc.)
  context/        # React context for auth and jobs
  services/       # Data layer (swap for Spring Boot API later)
  utils/          # Validation helpers
  constants/      # Platform and status options
```

## Backend Integration

The `services/authService.js` and `services/jobService.js` files abstract all data access. Replace localStorage calls with fetch/axios calls to your Spring Boot REST API when ready.
