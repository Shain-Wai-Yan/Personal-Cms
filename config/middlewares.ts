export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "https://personal-web-deploy.vercel.app",
        "http://127.0.0.1:5500", // Add your local development server
        "http://localhost:5500", // Also add localhost equivalent
        "http://localhost:3000", // Common Next.js development port
        "https://shainwaiyan.com", // Your new domain
        "http://shainwaiyan.com", // HTTP variant of your domain
        "https://www.shainwaiyan.com", // WWW subdomain variant
        "http://www.shainwaiyan.com", // HTTP WWW subdomain variant
        "https://api.shainwaiyan.com", // Primary Strapi subdomain
        "http://api.shainwaiyan.com", // HTTP variant of primary subdomain
      ],
      headers: [
        "Content-Type",
        "Authorization",
        "Origin",
        "Accept",
        "cache-control",
        "Cache-Control", // Added for case-sensitive servers
        "Pragma", // Added for cache control
        "Expires", // Added for cache control
        "If-Modified-Since", // Added for conditional requests
        "If-None-Match", // Added for ETag support
        "ETag", // Added for response validation
        "Last-Modified", // Added for timestamp validation
        "Content-Length", // Added for response size
        "Content-Range", // Added for partial content support
        "Range", // Added for partial content requests
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
      credentials: true,
      maxAge: 86400, // 24 hours in seconds - how long preflight requests can be cached
      preflightContinue: false,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  // Add the read-only middleware
  {
    name: "global::read-only",
    config: {},
  },
];
