# QuickHire — Full-Stack Job Board Application

A modern job board application built with **React.js + Vite + Tailwind CSS** (frontend) and **PHP/Laravel** (backend), closely matching the provided Figma design.

---

## Project Structure

```
QuickHire/
├── frontend/          # React.js + Vite + Tailwind CSS
└── backend/           # PHP Laravel API
```

---

## Frontend Setup

### Requirements
- Node.js >= 18

### Installation

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

### Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page (all 7 sections) |
| `/jobs` | Job listings with search & filter |
| `/jobs/:id` | Job detail with Apply Now form |
| `/admin` | Admin dashboard (add/delete jobs) |

---

## Backend Setup

### Requirements
- PHP >= 8.2
- Composer
- MySQL or SQLite (default: SQLite)

### Installation

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

### Database Configuration

The project is pre-configured for **SQLite** (zero setup). For MySQL:

1. Create a MySQL database: `CREATE DATABASE quickhire_db;`
2. Edit `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=quickhire_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

### Run Migrations & Seed

```bash
php artisan migrate:fresh --seed
```

This will create all tables and seed **15 sample job listings**.

### Start API Server

```bash
php artisan serve --port=8000
```

API available at **http://localhost:8000/api/**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/jobs` | List all jobs (supports `?search=`, `?category=`, `?location=`) |
| `GET` | `/api/jobs/{id}` | Get single job details |
| `POST` | `/api/jobs` | Create a new job listing |
| `DELETE` | `/api/jobs/{id}` | Delete a job listing |
| `POST` | `/api/applications` | Submit a job application |
| `GET` | `/api/applications` | List all applications |

### Create Job — Request Body
```json
{
  "title": "Brand Designer",
  "company": "Dropbox",
  "company_logo": "https://logo.clearbit.com/dropbox.com",
  "location": "San Francisco, US",
  "category": "Design",
  "type": "Full Time",
  "description": "Job description..."
}
```

### Submit Application — Request Body
```json
{
  "job_listing_id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "resume_link": "https://resume.link/johndoe",
  "cover_note": "I am excited to apply..."
}
```

---

## Database Models

### Job (job_listings)
| Field | Type |
|-------|------|
| id | bigint |
| title | varchar |
| company | varchar |
| company_logo | varchar (nullable) |
| location | varchar |
| category | varchar |
| type | varchar |
| description | text |
| created_at / updated_at | timestamp |

### Application (applications)
| Field | Type |
|-------|------|
| id | bigint |
| job_listing_id | FK → job_listings.id |
| name | varchar |
| email | varchar |
| resume_link | varchar |
| cover_note | text |
| created_at / updated_at | timestamp |

---

## Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (`backend/.env`)
```env
APP_NAME=QuickHire
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
# or configure MySQL above
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Vite, Tailwind CSS v4, React Router v6 |
| HTTP Client | Axios |
| Backend | PHP 8.4, Laravel 12 |
| Database | SQLite (default) / MySQL |
| Icons | Lucide React |
| Fonts | Epilogue (Google Fonts) |

---

## Features

- ✅ **Landing Page** — All 7 sections matching Figma design
- ✅ **Job Listings** — Search by keyword, filter by category & location
- ✅ **Job Detail** — Full description + Apply Now form
- ✅ **Apply Form** — Name, Email, Resume URL, Cover Note (with validation)
- ✅ **Admin Panel** — Post new jobs, delete listings with confirmation
- ✅ **Responsive** — Mobile-friendly on all pages
- ✅ **REST API** — All CRUD endpoints with input validation
- ✅ **Graceful Fallback** — Works with mock data when backend is offline
