export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "https://personal-web-deploy.vercel.app",
        "http://127.0.0.1:5500", // Add your local development server
        "http://localhost:5500", // Also add localhost equivalent
        "http://localhost:3000", // Common Next.js development port
        "https://shainwaiyan.com", // Your new domain
        "http://shainwaiyan.com", // HTTP variant of your domain
        "https://www.shainwaiyan.com", // WWW subdomain variant
        "http://www.shainwaiyan.com", // HTTP WWW subdomain variant
      ],
      headers: [
        "Content-Type",
        "Authorization",
        "Origin",
        "Accept",
        "cache-control",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];