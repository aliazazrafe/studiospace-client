# Project StudioSpace

**Find and book creative studio spaces.**

Live website: https://studiospace-client-rho.vercel.app

StudioSpace is a peer-to-peer marketplace where creators can discover and book creative workspaces, and hosts can manage their studio listings.

## Features

- Interactive hero slider with calls to explore studios and host a space.
- Featured studios loaded dynamically from MongoDB, plus category browsing and search.
- Studio details with images, amenities, host information, and booking options.
- Studio image uploads through the configured image-hosting service.
- Email and password authentication, Google sign-in, and protected routes.
- Studio owners can add, update, and delete their listings.
- Studio bookings are saved with a Pending status; users can view and cancel pending bookings.
- Confirmed booking time overlaps are checked to prevent double bookings.
- Protected server mutations use JWTs stored in HTTPOnly cookies.
- Responsive layout, light/dark theme toggle, loading indicators, empty states, custom not-found page, and toast notifications.

## Tech Stack

- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS, Swiper.js
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB Atlas
- **Authentication:** Better Auth, MongoDB adapter, JWT with HTTPOnly cookies
- **Image hosting:** imgbb
- **Hosting:** Vercel (frontend), Render (backend)

## Live Application

- **Website:** https://studiospace-client-rho.vercel.app
- **Backend API:** https://studiospace-server-ipdq.onrender.com

## GitHub Repositories

- **Client:** https://github.com/aliazazrafe/studiospace-client
- **Server:** https://github.com/aliazazrafe/studiospace-server

## Local Setup

### Requirements

- Node.js and npm
- MongoDB Atlas connection
- Google OAuth credentials
- imgbb API key

### 1. Start the backend

Clone the server repository and install its dependencies:

```bash
git clone https://github.com/aliazazrafe/studiospace-server.git
cd studiospace-server
npm install

## Examiner Test Credentials
**Email:** `jawataafnan321@gmail.com`
- **Password:** `StudioExaminer2026!`

## Local Setup
The README should include the steps an examiner needs to run the project on their own computer:

1. Install the backend dependencies and add the MongoDB and authentication settings to the server’s `.env` file.
2. Start the backend with `npm run dev`.
3. In a separate terminal, install the client dependencies and add the API URL to the client’s `.env.local` file.
4. Start the frontend with `npm run dev`.
5. Open `http://localhost:3000` in a browser.
6.

### Start the Backend

NEXT_PUBLIC_API_URL=http://localhost:5000
PORT=5000
CLIENT_URL=http://localhost:3000
DB_NAME=studiospace
MONGODB_URI=mongodb+srv://studiospace_app: valid_password @cluster0.iypuczp.mongodb.net/
BETTER_AUTH_SECRET=a1711eb3c372243e1416bf5c380801e747fd650ca8d187e1b4930ec97417a65e
BETTER_AUTH_URL=http://localhost:5000
GOOGLE_CLIENT_ID=647187803619-k9rn9qdjma4m6ofe1jneo79h959ojc23.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=Enter client sceret 

### Start the Frontend

Open a new terminal, go to the client folder, install the dependencies, and start the development server:

```bash
cd studiospace-client
npm install
npm run dev

