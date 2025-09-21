# Project Title

_Team Members:_

- Arany Hasan | arany.cse.20220204053@aust.edu
- Likhon Saha | likhon.cse.20220204065@aust.edu
- Mahir Faisal| mahir.cse.20220204073@aust.edu
- Ahmed Nafis Siam | siam.cse.20220204075@aust.edu

_Project Live Link:_ [Insert URL]
_Recorded video:_ [\[Insert URL\] (Optional)](HospitALL_Video.zip)

---

## Table of Contents

1. [Project Description](#1-project-description)
2. [Workflow Overview](#2-workflow-overview)
3. [Main Features](#3-main-features)
4. [Technologies Used](#4-technologies-used)
5. [System Architecture](#5-system-architecture)
6. [Setup Guidelines](#6-setup-guidelines)
   - [Backend](#backend)
   - [Frontend](#frontend)
7. [Running the Application](#7-running-the-application)
8. [Deployment Status & Tests](#8-deployment-status--tests)
9. [Contribution Table](#9-contribution-table)
10. [Screenshots](#10-screenshots)
11. [Limitations / Known Issues](#11-limitations--known-issues)

---

## 1. Project Description

HospitALL is a smart and unified healthcare management platform.  
It brings together patient information, doctor coordination, and emergency response.  
From appointments to real-time alerts, everything stays in sync.  
The system includes an AI-powered chatbot to assist patients with queries, guidance, and support.  
HospitALL keeps hospitals connected, efficient, and always ready.

---

## 2. Workflow Overview

-Patients can easily book appointments, access health records, and communicate with doctors via the platform.
-Doctors can manage their professional profiles, patient consultations, and appointment schedules.
-he platform features an AI-powered symptom checker, which assists users in identifying potential health issues based on the symptoms they describe.
-Real-time alerts notify patients and doctors about appointment reminders.
-Administrators have access to advanced tools for system oversight, ensuring smooth management of the entire platform.

---

## 3. Main Features

- AI symptom checker gives disease recommendations
- Find doctors by specialty and browse nearby hospital services.
- Book and manage appointments with doctors directly on the platform.
- Read and write reviews to choose the right healthcare provider.
- Request ambulance service from nearby hospitals for urgent situations.
- Manage personal and professional profiles for patients and doctors.

---

## 4. Technologies Used

- _Frontend:_ React JS (JavaScript Library)
- _Backend:_ Laravel (PHP Framework)
- _Database:_ phpMyAdmin (MySQL)
- _Styling:_ Tailwind CSS / Bootstrap
- _Other Tools:_ GitHub, ESLint/Prettier, PHPUnit/Pest, Vitest, Laravel Pint.

---

## 5. System Architecture

HospitALL follows a modular, API-first architecture with a clear separation of patient-facing frontend, doctor/admin interface, and backend API.

Frontend: React SPA for patient portal, doctor dashboards, and hospital services interface.
Backend: Laravel RESTful API, authentication via Sanctum.
Database: MySQL with structured tables for patients, doctors, appointments.
Scalability: Supports horizontal scaling with queue workers
Security: Role-based permissions for patients, doctors, and admins, validation of input data, audit logging for medical records, and rate limiting to prevent abuse.

---

## 6. Setup Guidelines

### Backend

bash

# Clone the repository

git clone <https://github.com/HospitALL01>
cd backend

# Install dependencies

npm install

# Setup environment variables

cp .env.example .env

# Edit .env as needed

# Run backend server

php artisan serve

### Frontend

bash
cd frontend

# Install dependencies

npm install

# Setup environment variables

cp .env.example .env

# Edit .env as needed

# Run frontend

npm run dev

---

## 7. Running the Application

- Start the _backend_ using Laravel (php artisan serve).
- Start the _frontend_ using Vite (npm run dev).
- Access the admin dashboard and storefront via provided localhost ports.
- Alternatively, access the _deployed live link_ if available.

## 8. Deployment Status & Tests

| Component | Is Deployed? | Is Dockerized? | Unit Tests Added? (Optional) | Is AI feature implemented? (Optional) |
| --------- | ------------ | -------------- | ---------------------------- | ------------------------------------- |
| Backend   | No           | No             | No                           | Yes                                   |
| Frontend  | No           | No             | No                           | Yes                                   |

## 9. Contribution Table

| Metric                        | Total | Backend | Frontend | Member 1 | Member 2 | Member 3 | Member 4 |
| ----------------------------- | ----- | ------- | -------- | -------- | -------- | -------- | -------- |
| Issues Solved                 | 12    | 0       | 12       | 3        | 3        | 3        | 3        |
| WakaTime Contribution (Hours) | 108   | 41      | 70       | 27       | 3        | 57       | 23       |
| Percent Contribution (%)      |       |         |          |          |          |          |          |

## 10. Screenshots

Include screenshots or GIFs of the deployed application.

## 11. Limitations / Known Issues

Some hospital management systems may require manual configuration for patient data syncing depending on the healthcare region.
Appointment scheduling can occasionally experience delays if the server is under heavy load.
Integration with third-party diagnostic tools is still being developed for improved data consistency and real-time results.
