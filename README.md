# VibeKit Studio

> Generate a theme, build a mini-site, publish it.

A full-stack web application where users can pick a design theme, build a mini-site using a page editor, and publish it to a public URL.

**Live URL:** https://your-netlify-url.netlify.app

---

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Netlify Functions (serverless Node.js)
- **Database:** PostgreSQL (Neon)
- **Auth:** JWT via httpOnly cookies + bcrypt password hashing
- **Deployment:** Netlify

---

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/mdtaha-dev/Vibekit-Studio
cd vibekit-studio
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd netlify/functions
npm install
cd ../..
```

### 4. Set up environment variables

Create a `.env` file in the project root:
```
DATABASE_URL=postgresql://your-neon-connection-string?sslmode=require
JWT_SECRET=your-jwt-secret-min-32-chars
APP_URL=http://localhost:5173
```

### 5. Set up the database

Run the SQL schema in your Neon SQL editor:
```sql
-- schema is in supabase/migrations/001_initial_schema.sql
```

### 6. Run locally
```bash
netlify dev
```

App runs at `http://localhost:8888`

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `APP_URL` | Frontend URL for CORS |

---

## Test Credentials

You can sign up directly on the live site, or use:

- **Email:** test@example.com
- **Password:** password123

---

## Features

- Email and password authentication with JWT session via httpOnly cookie
- 6 design themes: Minimal, Neo-Brutal, Neon, Pastel, Luxury, Retro
- Page builder with Hero, Features, Gallery, and Contact sections
- Live preview with Desktop, Tablet, and Mobile toggle
- Auto-save while editing
- Publish and unpublish pages
- Public pages at `/p/:slug` with view counter
- Contact form submissions stored in database
- Duplicate pages
- Section reordering

---

## Tradeoffs + What I Would Improve Next

1. **No drag and drop reordering** — sections are reordered with up/down buttons. A proper drag and drop library like dnd-kit would significantly improve the editor UX.

2. **Preview is inline not an iframe** — the live preview renders React components directly rather than an isolated iframe. This means theme fonts from the published page may not fully match in the editor preview.

3. **No image upload** — gallery images require a URL. Integrating Cloudinary or an S3 bucket for direct image uploads would make the product significantly more usable.

4. **Contact form does not send email** — submissions are stored in the database only. Integrating Resend or Nodemailer would complete the contact flow end to end.

5. **No custom slug editing** — slugs are auto-generated from the page title. Allowing users to manually set a custom slug would improve the publishing experience.

---

## Auth Implementation Note

Sessions are managed via JWT stored in an httpOnly cookie named `vk_session`. The token is signed with `JWT_SECRET` and expires in 7 days. All authenticated API endpoints verify the token server-side via the `requireAuth` utility in `netlify/functions/_auth.js`. Publish and unpublish actions are enforced server-side — the client cannot manipulate page status directly.