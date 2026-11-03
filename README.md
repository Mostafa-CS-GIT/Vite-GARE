# Grand Atlas RE

A real estate discovery project built with React and Vite. Browse properties, explore neighborhoods, and learn about the developers behind each listing.

## Features

- Responsive React interface with pages for home, about, services, developers, neighborhoods, and properties
- Property and neighborhood detail pages
- Express API serving sample real estate data
- Swagger API documentation
- Tailwind CSS styling

## Getting started

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install and run

```bash
npm ci
```

Start the API and web app together:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The frontend uses the same-origin `/api/v1` path by default; Vite and Vercel forward `/api` requests to the hosted API. Set `VITE_API_URL` in a local Vite environment file only when using a different API base URL. Vite also forwards `/api-docs` requests to the local Express API on port `4000`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API and Vite development servers |
| `npm run dev:web` | Start only the Vite development server |
| `npm run dev:api` | Start only the Express API |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## API

The local Express API in `server/index.js` serves in-memory sample data at:

| Endpoint | Description |
| --- | --- |
| `GET /health` | API health check |
| `GET /api/v1/developer` | List developers |
| `GET /api/v1/developer/:id` | Get a developer |
| `GET /api/v1/zone` | List neighborhoods |
| `GET /api/v1/zone/:id` | Get a neighborhood |
| `GET /api/v1/unit` | List properties |
| `GET /api/v1/unit/:id` | Get a property |
| `POST /api/v1/contactus` | Submit a contact message |
| `POST /api/v1/contact` | Submit a contact message |

With the API running, view the interactive Swagger UI at [http://localhost:4000/api-docs](http://localhost:4000/api-docs). The Vite `/api` proxy and Vercel rewrite forward API traffic to the hosted API; they do not route those requests to this local sample API.

The sample API data is held in memory and resets when the server restarts. The local API port defaults to `4000` and can be changed with the `PORT` environment variable.

## Project structure

```text
components/   Shared layout and UI components
developers/   Developer pages
pages/        Main pages and property/neighborhood views
server/       Express API and OpenAPI specification
src/          React entry point, styles, and API helpers
```

## Environment

The frontend API base URL can be overridden with `VITE_API_URL` in a local Vite environment file. Local `.env` files are ignored by Git; do not commit credentials or other secrets.
