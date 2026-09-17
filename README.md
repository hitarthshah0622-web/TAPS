# Tabletap

Private restaurant administration and public review-assistant pages.

## Deploy
See [DEPLOY.md](DEPLOY.md) for hosting commands and required private environment variables.

The repository root must contain package.json, pnpm-lock.yaml, app/, and components/. Upload the contents of this folder directly into the GitHub repository; do not upload this folder as an extra enclosing directory.

No admin passwords or private customer data are included. Configure ADMIN_PASSWORD and ADMIN_SESSION_SECRET privately in the hosting dashboard.

This version uses file storage on a standalone Node server. Persistent storage or a database integration is required for durable restaurant records. A free service with an ephemeral filesystem is for testing only.
