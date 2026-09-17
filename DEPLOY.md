# Deploy Tabletap on a Node.js server

This package contains the current password-protected restaurant workspace, public customer review pages, and restaurant-specific QR generation. It is source code, not a static HTML upload.

## Server requirements
- Node.js 22.13 or newer and pnpm 11.19.0.
- A long-running Node process, HTTPS, and a writable persistent `work/` folder.
- Run one application instance with this file-storage configuration.
- A static-only host cannot run this app. An ephemeral/serverless filesystem will not reliably preserve restaurants or analytics. Choose persistent storage or integrate a shared database before relying on it for real customers.

## Hosting settings
Install command: `npx --yes pnpm@11.19.0 install --frozen-lockfile`
Build command: `npx --yes pnpm@11.19.0 build`
Start command: `npx --yes pnpm@11.19.0 start`
The host can set PORT. The Next.js server uses it automatically.

Set these PRIVATE environment variables in your server dashboard before starting:
- ADMIN_PASSWORD: choose a strong password known only to you.
- ADMIN_SESSION_SECRET: a long random secret, different from your password. Generate one using `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.

No live passwords or secrets are included. Do not commit a populated .env file.

## After deployment
1. Open your actual HTTPS domain and sign in with the password you configured.
2. Add the restaurant name, location, and correct Google review link.
3. Click Create QR from the hosted admin page. It encodes YOUR_DOMAIN/r/restaurant-slug.
4. Scan it on a phone. The guest should see that restaurant, choose stars/details, edit a draft, and then copy/open Google.
5. Replace any older Google-direct or localhost QR printouts.

The admin area is private; customer review pages must remain publicly reachable for QR guests. Do not put a site-wide password in front of the customer pages.

## Data and limitations
This standalone Node package uses a persistent JSON file at work/tabletap-data.json, not a configured Supabase database. Existing local customer records and private activity were not exported. Add your real records after deployment. The bundled sample restaurant records are not evidence of real subscribers.

The writing assistant uses varied templates, not a connected paid AI model. Google requires the guest to paste and submit; automatic cross-site paste is not supported.

The app was checked locally and TypeScript passed. A standalone production deployment has NOT been verified; the Windows environment previously blocked production-build subprocesses. Your host must successfully build before the site can go live. This ZIP does not include free hosting or establish that any provider's free plan meets the persistence requirements.
