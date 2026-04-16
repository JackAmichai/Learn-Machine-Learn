# Deployment Guide

This project is a pure client-side Vite + React app. It deploys to Vercel with
no custom server configuration.

## 1. Environment variables

### Required

| Name | Used by | Notes |
|---|---|---|
| `VITE_HF_TOKEN` | `src/components/Chatbot.jsx` (ML Mentor) | Hugging Face Inference Provider token. Browser-visible at build time. |

> ⚠️  **Security note.** `VITE_*` env vars are embedded in the built JavaScript
> bundle and are therefore visible to anyone who inspects your site. Only use a
> token with the minimum required scopes (a read-only "Inference" token is
> enough to call the router endpoint). **Never use a Write-scope token here.**
>
> If a token is ever exposed publicly (shared in chat, committed to git, etc.),
> revoke it immediately at <https://huggingface.co/settings/tokens> and
> generate a new one.

### Local development

```bash
cp .env.example .env.local
# Open .env.local and paste your token value for VITE_HF_TOKEN
npm run dev
```

`.env.local` is gitignored (via the existing `*.local` rule in `.gitignore`)
so it will not be committed.

## 2. Setting the token in Vercel

### Via the Vercel dashboard (recommended)

1. Go to your project on <https://vercel.com>
2. **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `VITE_HF_TOKEN`
   - **Value**: your Hugging Face token (starts with `hf_`)
   - **Environments**: tick **Production**, **Preview**, and **Development**
4. Click **Save**
5. Redeploy: **Deployments** → latest deployment → **…** → **Redeploy**
   (without cache).

### Via the Vercel CLI

```bash
# one-time install
npm i -g vercel

vercel login
vercel link            # connect this folder to your Vercel project

# add the variable to all three environments
vercel env add VITE_HF_TOKEN production
vercel env add VITE_HF_TOKEN preview
vercel env add VITE_HF_TOKEN development

# trigger a fresh production build
vercel --prod
```

Each `env add` command will prompt you to paste the token value — it is sent
directly to Vercel and never written to disk.

## 3. Verifying the deploy

After redeploying, open the live site and click the **Ask ML Mentor** button
in the bottom-right. The status indicator should read **Ready · Llama-3.1-8B-Instruct**
(not "Token needed"). Ask a question — you should get a response.

If the status still says "Token needed":

- Double-check that the env var key is spelled **exactly** `VITE_HF_TOKEN`
  (case-sensitive, with the `VITE_` prefix — Vite only exposes vars with that
  prefix to the browser).
- Confirm that you redeployed **after** adding the env var. Existing deploys
  are immutable; the new value only takes effect on a fresh build.
- Check the HF token has not been revoked at
  <https://huggingface.co/settings/tokens>.

## 4. Feedback form

The footer feedback form submits to [FormSubmit.co](https://formsubmit.co),
which forwards messages to `jackamichai@gmail.com`. **No backend, account, or
API key is required** — FormSubmit reads the target email from the endpoint
URL itself.

The **first** submission after deployment will bounce; FormSubmit sends a
one-time confirmation email to `jackamichai@gmail.com`. Click the link in
that email once and all subsequent submissions will be delivered normally.

To change the destination email, edit `FEEDBACK_EMAIL` in
`src/components/Footer.jsx`.
