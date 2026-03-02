<div align="center">

<img src="https://img.shields.io/badge/QuickHire-Job%20Board-4640DE?style=for-the-badge&logo=briefcase&logoColor=white" alt="QuickHire" height="60"/>

# QuickHire

**A modern, full-stack job board platform built with React.js + Laravel**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com/)
[![PHP](https://img.shields.io/badge/PHP-8.4-777BB4?style=flat-square&logo=php&logoColor=white)](https://php.net/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

[Live Demo](#) · [Report Bug](https://github.com/Fahim7272/QuickHire/issues) · [Request Feature](https://github.com/Fahim7272/QuickHire/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧐 About The Project

QuickHire is a professional job board platform that connects job seekers with companies. It provides an intuitive interface for browsing and applying for jobs, and a powerful admin panel for managing listings.

The UI design is inspired by a modern Figma template, featuring a pixel-perfect implementation with a clean indigo color palette, responsive layouts, and smooth micro-interactions.

---

## ✨ Features

### For Job Seekers
- 🔍 **Smart Search** — Search by job title, keyword, or company name
- 🏷️ **Category & Location Filter** — Filter jobs by category (Design, Marketing, Technology, etc.) and location
- 📄 **Detailed Job View** — Full job descriptions with company info
- 📝 **One-Click Apply** — Apply directly with name, email, resume link, and cover note
- ✅ **Client-side Validation** — Real-time form validation with instant feedback

### For Employers / Admin
- ➕ **Post Jobs** — Create new listings via an intuitive form
- 🗑️ **Manage Listings** — Delete job postings with a confirmation dialog
- 📊 **Dashboard Stats** — At-a-glance overview of total, full-time, part-time, and remote positions

### General
- 📱 **Fully Responsive** — Mobile-first design, works on all screen sizes
- ⚡ **Graceful Fallback** — Runs entirely on mock data when the backend is offline
- 🎨 **Figma-matched UI** — Faithful implementation of the provided design system

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend Framework | React.js | 18 |
| Build Tool | Vite | 7 |
| Styling | Tailwind CSS | v4 |
| Routing | React Router | v6 |
| HTTP Client | Axios | latest |
| Icons | Lucide React | latest |
| Fonts | Epilogue (Google Fonts) | — |
| Backend Framework | Laravel | 12 |
| Language | PHP | 8.4 |
| Database | SQLite (dev) / MySQL (prod) | — |
| API Style | RESTful JSON API | — |

---

## 📁 Project Structure

```
QuickHire/
│
├── frontend/                  # React.js application
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── CompaniesStrip.jsx
│   │   │   ├── CategorySection.jsx
│   │   │   ├── CTABanner.jsx
│   │   │   ├── FeaturedJobs.jsx
│   │   │   ├── LatestJobs.jsx
│   │   │   ├── JobCard.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/             # Route-level pages
│   │   │   ├── Home.jsx
│   │   │   ├── JobListings.jsx
│   │   │   ├── JobDetail.jsx
│   │   │   └── Admin.jsx
│   │   ├── services/          # API layer & mock data
│   │   │   ├── api.js
│   │   │   └── mockData.js
│   │   ├── App.jsx            # Router configuration
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind + global styles
│   ├── vite.config.js
│   └── package.json
│
├── backend/                   # Laravel REST API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── JobController.php
│   │   │   └── ApplicationController.php
│   │   └── Models/
│   │       ├── JobListing.php
│   │       └── Application.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │       ├── DatabaseSeeder.php
│   │       └── JobSeeder.php
│   ├── routes/
│   │   └── api.php
│   └── bootstrap/app.php
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | >= 18.x | [nodejs.org](https://nodejs.org/) |
| npm | >= 9.x | Included with Node.js |
| PHP | >= 8.2 | [php.net](https://php.net/) |
| Composer | >= 2.x | [getcomposer.org](https://getcomposer.org/) |
| MySQL | >= 8.0 *(optional)* | [mysql.com](https://mysql.com/) |

---

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. (Optional) Configure environment
cp .env.example .env
# Edit VITE_API_BASE_URL if your backend runs on a different port

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

#### Frontend Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with all 7 sections |
| `/jobs` | Job Listings | Browse, search, and filter jobs |
| `/jobs/:id` | Job Detail | Full description + apply form |
| `/admin` | Admin Dashboard | Manage job listings |

---

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install PHP dependencies
composer install

# 3. Copy the environment file
cp .env.example .env

# 4. Generate the app encryption key
php artisan key:generate

# 5. Run migrations and seed sample data
php artisan migrate:fresh --seed

# 6. Start the API server
php artisan serve --port=8000
```

The API will be available at **http://localhost:8000/api**

#### Switching to MySQL (Optional)

By default the project uses **SQLite** (zero configuration). To use MySQL:

1. Create a database:
   ```sql
   CREATE DATABASE quickhire_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. Update `backend/.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=quickhire_db
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

3. Re-run migrations:
   ```bash
   php artisan migrate:fresh --seed
   ```

---

## 📡 API Reference

**Base URL:** `http://localhost:8000/api`

All responses follow a consistent JSON structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

---

### Jobs

#### `GET /api/jobs`
Returns a list of all job listings. Supports optional query filters.

**Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Filter by title, company, or description |
| `category` | string | Filter by category (e.g., `Design`, `Marketing`) |
| `location` | string | Filter by location (partial match) |

**Example Request**
```http
GET /api/jobs?category=Design&location=Spain
```

**Example Response**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Brand Designer",
      "company": "Dropbox",
      "company_logo": "https://logo.clearbit.com/dropbox.com",
      "location": "San Francisco, US",
      "category": "Design",
      "type": "Full Time",
      "description": "...",
      "created_at": "2026-03-03T00:00:00.000000Z"
    }
  ]
}
```

---

#### `GET /api/jobs/{id}`
Returns a single job by ID.

```http
GET /api/jobs/1
```

---

#### `POST /api/jobs`
Creates a new job listing.

**Request Body**
```json
{
  "title": "Brand Designer",
  "company": "Dropbox",
  "company_logo": "https://logo.clearbit.com/dropbox.com",
  "location": "San Francisco, US",
  "category": "Design",
  "type": "Full Time",
  "description": "Dropbox is looking for a Brand Designer..."
}
```

**Validation Rules**

| Field | Rules |
|-------|-------|
| `title` | Required, string, max 255 |
| `company` | Required, string, max 255 |
| `location` | Required, string, max 255 |
| `category` | Required, string, max 100 |
| `description` | Required, string |
| `company_logo` | Optional, must be a valid URL |
| `type` | Optional, string, max 50 |

---

#### `DELETE /api/jobs/{id}`
Deletes a job listing by ID.

```http
DELETE /api/jobs/1
```

---

### Applications

#### `POST /api/applications`
Submits a job application.

**Request Body**
```json
{
  "job_listing_id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "resume_link": "https://linkedin.com/in/janedoe",
  "cover_note": "I am excited to apply for this position..."
}
```

**Validation Rules**

| Field | Rules |
|-------|-------|
| `job_listing_id` | Required, must exist in `job_listings` table |
| `name` | Required, string, max 255 |
| `email` | Required, valid email format |
| `resume_link` | Required, valid URL (must start with `http://` or `https://`) |
| `cover_note` | Required, string |

#### `GET /api/applications`
Returns all submitted applications (admin use).

---

## 🗄 Database Schema

### `job_listings`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | bigint | PK, auto-increment |
| `title` | varchar(255) | NOT NULL |
| `company` | varchar(255) | NOT NULL |
| `company_logo` | varchar(255) | nullable |
| `location` | varchar(255) | NOT NULL |
| `category` | varchar(100) | NOT NULL |
| `type` | varchar(50) | default: `Full Time` |
| `description` | text | NOT NULL |
| `created_at` | timestamp | auto |
| `updated_at` | timestamp | auto |

### `applications`

| Column | Type | Constraints |
|--------|------|-------------|
| `id` | bigint | PK, auto-increment |
| `job_listing_id` | bigint | FK → `job_listings.id` ON DELETE CASCADE |
| `name` | varchar(255) | NOT NULL |
| `email` | varchar(255) | NOT NULL |
| `resume_link` | varchar(255) | NOT NULL |
| `cover_note` | text | NOT NULL |
| `created_at` | timestamp | auto |
| `updated_at` | timestamp | auto |

---

## ⚙️ Environment Variables

### Frontend — `frontend/.env`

```env
# Backend API base URL (Vite proxy already handles /api → localhost:8000)
VITE_API_BASE_URL=http://localhost:8000
```

### Backend — `backend/.env`

```env
APP_NAME=QuickHire
APP_ENV=local
APP_KEY=            # Set by: php artisan key:generate
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database (SQLite default — no config needed)
DB_CONNECTION=sqlite

# For MySQL, replace the above with:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=quickhire_db
# DB_USERNAME=root
# DB_PASSWORD=

# Cache & Session
CACHE_STORE=database
SESSION_DRIVER=database
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place. Any contributions are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'feat: add AmazingFeature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

Please make sure your code follows the existing style and passes all validations before submitting a PR.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Made with ❤️ by [Fahim](https://github.com/Fahim7272)

⭐ Star this repo if you found it helpful!

</div>
