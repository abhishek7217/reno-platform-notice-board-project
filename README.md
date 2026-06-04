# Reno Notice Board

A Notice Board application built for the Reno Platforms Web Development Internship Assignment.

The application allows users to create, view, edit, and delete notices through a responsive interface. All notice data is stored in a hosted database using Prisma and remains available after refresh or redeployment.

## Tech Stack

- Next.js (Pages Router)
- Prisma
- MySQL-compatible hosted database
- Tailwind CSS

## Features

- Create new notices
- View all notices
- Edit existing notices
- Delete notices with confirmation
- Server-side validation
- Urgent notices displayed above normal notices
- Responsive design for mobile and desktop
- Optional image URL support

## Running Locally

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```env
DATABASE_URL="your_database_connection_string"
```

3. Generate Prisma Client and sync the database:

```bash
npx prisma generate
npx prisma db push
```

4. Start the development server:

```bash
npm run dev
```

5. Open http://localhost:3000

## Deployment

The application is deployed on Vercel and uses a hosted database. The same `DATABASE_URL` should be added to the Vercel project environment variables before deployment.


## AI Usage

AI tools were used to assist with initial project setup, boilerplate code generation, and documentation. The implementation was reviewed, modified, and tested manually to ensure it follows the assignment requirements.

## Future Improvement

I would add image upload support instead of using an optional image URL field, so users can upload notice images directly from the form.