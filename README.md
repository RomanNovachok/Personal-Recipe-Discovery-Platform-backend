FlavorAI Backend

This is the backend API for the "FlavorAI" web application - a smart recipe assistant that helps users manage and discover recipes. Built using NestJS, PostgreSQL, Prisma, and JWT-based authentication.

Tech Stack:

-NestJS (Node.js framework)
-TypeScript
-PostgreSQL
-Prisma ORM
-JWT Authentication

Getting Started!

1. Clone and Install

clone repository, then

cd .\backend\
npm install

2. Configure Environment

Create a .env file in the root and provide your database and JWT secret:

DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/flavorai
JWT_SECRET=your_jwt_secret_here

3. Setup Prisma

# Generate Prisma Client

npx prisma generate

# Run migrations

npx prisma migrate dev

4. Start the Server

# Development

npm run start:dev

# Production

npm run build
npm run start:prod

API Endpoints:

-Auth

POST /auth/register – Register a new user

POST /auth/login – Login and receive JWT token

-Recipes

GET /recipes – Get all recipes (public)

GET /recipes/:id – Get recipe by ID

GET /recipes/my – Get current user's recipes

POST /recipes – Create a new recipe (auth required)

PATCH /recipes/:id – Update a recipe (auth + owner only)

DELETE /recipes/:id – Delete a recipe (auth + owner only)

-Ratings

POST /rating – Submit or update rating (1–5 stars) for a recipe (auth required)

Testing (Optional)

# Unit tests

npm run test

# E2E tests

npm run test:e2e

# Coverage

npm run test:cov

Technical Decisions

-Prisma ORM was used for its excellent type-safety and developer experience.

-JWT authentication is lightweight and suitable for stateless APIs.

-Recipe ratings are stored in a separate Rating model with a unique constraint on (userId, recipeId) to prevent duplicate ratings.

-Average rating is calculated on the frontend using the ratings array from the API, which allows flexibility and performance optimization if needed later.

-NestJS modular architecture keeps the codebase clean and maintainable.
