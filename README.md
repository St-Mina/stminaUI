# St. Mina Church UI (Angular + WordPress)

Angular frontend for the church website, powered by WordPress content via the REST API.

## Stack

- Angular 21 (standalone app)
- SCSS
- WordPress REST API (`/wp-json/wp/v2`)
- GitLab Pages deployment

## Quick Start

1. Install dependencies:
   - `npm install`
2. Set your WordPress API base URL:
   - Development: edit `src/environments/environment.development.ts`
   - Production: edit `src/environments/environment.ts`
3. Run locally:
   - `npm start`
4. Build for production:
   - `npm run build -- --configuration production`

## WordPress Requirements

- WordPress site must expose the REST API:
  - `https://your-site.com/wp-json/wp/v2/posts`
- If your WordPress domain differs from Angular domain, enable CORS on WordPress/server.

## CI / Deployment

GitLab CI in `.gitlab-ci.yml`:
- Installs dependencies
- Builds Angular app
- Publishes `dist/st-mina-ui/browser` to GitLab Pages (`public/`)

## Notes

- Previous static prototype files were moved to `legacy-static/`.
- Homepage currently shows latest posts from WordPress as a starter integration.
