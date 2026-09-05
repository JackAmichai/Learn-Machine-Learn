# Deployment Guide

This project is a pure client-side Vite + React app. It deploys to Vercel with
no custom server configuration.

## 1. Environment variables

### Local development

```bash
cp .env.example .env.local
npm run dev
```

`.env.local` is gitignored (via the existing `*.local` rule in `.gitignore`)
so it will not be committed.

## 2. Feedback form

The footer feedback form submits to [FormSubmit.co](https://formsubmit.co),
which forwards messages to `jackamichai@gmail.com`. **No backend, account, or
API key is required** — FormSubmit reads the target email from the endpoint
URL itself.

The **first** submission after deployment will bounce; FormSubmit sends a
one-time confirmation email to `jackamichai@gmail.com`. Click the link in
that email once and all subsequent submissions will be delivered normally.

To change the destination email, edit `FEEDBACK_EMAIL` in
`src/components/Footer.jsx`.
