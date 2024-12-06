# Tech-Challenge

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```plaintext
.env
.gitignore
.next/
docker-compose.yaml
jest.setup.js
next-env.d.ts
next.config.ts
package.json
postcss.config.mjs
prisma/
public/
README.md
src/
tailwind.config.ts
tsconfig.json


```

### Key Directories and Files

- **`.env`**: Environment variables.
- **`.next/`**: Next.js build output.
- **`docker-compose.yaml`**: Docker Compose configuration for PostgreSQL.
- **`jest.setup.js`**: Jest setup file.
- **`next.config.ts`**: Next.js configuration file.
- **`package.json`**: Project dependencies and scripts.
- **`postcss.config.mjs`**: PostCSS configuration.
- **`prisma/`**: Prisma schema and migrations.
- **`public/`**: Static assets.
- **`src/`**: Application source code.
- **`tailwind.config.ts`**: Tailwind CSS configuration.
- **`tsconfig.json`**: TypeScript configuration.

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```plaintext
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
NODE_ENV="development"
```

## Prisma

Prisma is used for database access. To set up Prisma, run the following commands:

```bash
npx prisma generate
npx prisma migrate dev
```

To seed the database, run:

```bash
npm run db:seed
```

## Docker

To start the PostgreSQL database using Docker, run:

```bash
docker-compose up
```

To stop the PostgreSQL database, run:

```bash
docker-compose down
```

## Running Tests

To run tests, use the following command:

```bash
npm test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
