# Smart Job Portal

A full-stack job portal web application built with React, Node.js, Express, and MongoDB.

## Features

- User registration and authentication
- Role-based dashboards (Job Seeker and Employer)
- Job posting and searching
- Job application
- Resume upload

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, MongoDB, JWT
- **Authentication:** JWT with bcrypt
- **File Upload:** Multer

## Installation

1. Clone the repository
2. Install dependencies for both client and server

### Client

```bash
cd client
npm install
npm run dev
```

### Server

```bash
cd server
npm install
npm run dev
```

3. Set up MongoDB and update .env in server

## Usage

- Register as a job seeker or employer
- Employers can post jobs
- Job seekers can search and apply for jobs
- Upload resumes

## API Endpoints

- POST /api/auth/register
- POST /api/auth/login
- GET /api/jobs
- POST /api/jobs (employer)
- POST /api/jobs/:id/apply
- POST /api/users/upload-resume