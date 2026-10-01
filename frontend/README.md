# Artistry Avenue

A responsive React storefront for thoughtful stationery and creative supplies, built with Vite, Tailwind CSS, React Router, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

The catalog uses local sample products unless `VITE_API_BASE_URL` is configured. Copy `.env.example` to `.env.local` and set the API origin to connect the catalog, account forms, and newsletter service. Request functions live in `src/services/`.

## Verify

```sh
npm run lint
npm run build
```
