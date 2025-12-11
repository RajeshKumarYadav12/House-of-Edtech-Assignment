# House-of-Edtech-Assignment


AI Task Manager is a production-ready full-stack web application built with Next.js (App Router).
It demonstrates:

Full CRUD operations for task management

Secure authentication using NextAuth (JWT strategy)

AI-powered suggestions via OpenAI

Modern UI using Tailwind CSS (with optional shadcn/ui)

Deployment on Vercel with CI/CD compatibility

Strong code structure, validation, and real-world engineering practices

This project aligns with the House of EdTech Full Stack Assignment, showcasing critical thinking, scalability, real-world usability, and secure development.

Features
✅ Authentication

User registration

Secure login

Password hashing with bcrypt

Auth-protected dashboard

Session management using NextAuth

✅ Task Management (CRUD)

Each task includes:

Title

Description

Priority

Deadline

Status

Owner (user ID)

Built with:

API routes

Zod validation

Error handling

Authorization checks

✅ AI-Powered Task Enhancements

Using OpenAI, the app can:

Suggest better task titles

Suggest better priorities

Suggest more realistic deadlines

A dedicated "✨ Improve with AI" button provides task enhancement suggestions.

✅ UI & UX

Tailwind CSS for styling

Accessible, responsive, mobile-friendly layouts

Dark mode support

Clean and modern layout design

✅ Deployment Ready

Configured for Vercel

Environment variable support

Production build commands

Secure secret management

Tech Stack

Next.js 16 (App Router, SSR/SSG, API routes)

TypeScript

PostgreSQL (Prisma ORM)

NextAuth (JWT strategy)

Tailwind CSS + optional shadcn/ui

Zod validation

OpenAI API

Vercel deployment

Quickstart — Local Development
1. Install dependencies
npm install
# or
yarn

2. Configure environment variables

Create a .env file and add the required variables (example below).

3. Setup database
npx prisma generate
npx prisma migrate dev --name init

4. Run the development server
npm run dev


Visit: http://localhost:3000

Environment Variables (.env)

Your .env should include:

# MongoDB Database
Mongo_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public

# NextAuth
NEXTAUTH_SECRET=replace_with_secure_random_string
NEXTAUTH_URL=http://localhost:3000

# OpenAI
OPENAI_API_KEY=sk-REPLACE_ME

# Node Environment
NODE_ENV=development


Never commit .env to GitHub. Always commit .env.example instead.

Database Schema (Prisma)

The system uses two main models:

User
model User {
  id        String   
  name      String?
  email     String
  password  String
  tasks     Task[]
  createdAt DateTime
}

Task
model Task {
  id          String  
  title       String
  description String
  priority    String
  deadline    DateTime
  status      String
  createdBy   String
  user        User     
  createdAt   DateTime  
}

OpenAI Integration

AI features are handled in /utils/ai.ts using OpenAI:

export async function suggestTaskImprovements(description: string) {
  const prompt = `Suggest a good title, priority, and realistic deadline for: ${description}`;
}


The AI endpoint returns:

Suggested title

Suggested priority

Suggested deadline

Triggered from UI via a button.

Authentication Flow

Register → Save hashed password in DB

Login → Validate credentials → Create JWT session

Protect dashboard using NextAuth middleware

API routes verify session user

API Endpoints Summary
🔹 Tasks
Method	Endpoint	Description
POST	/api/tasks	Create task
GET	/api/tasks	List tasks for logged-in user
PUT	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task
POST	/api/tasks/ai	AI suggestion
🔹 Auth

/api/auth/[...nextauth]

Deployment (Vercel)

Push your project to GitHub

Import repo into Vercel

Add environment variables (DATABASE_URL, NEXTAUTH_SECRET, OPENAI_API_KEY)

Deploy

Run Prisma migration for production

Test live app

Testing & CI/CD Suggestions

Add Jest + Supertest for API tests

Add GitHub Actions:

lint

build

test

Add automated Prisma migrations in production

Add rate limiting for OpenAI API

