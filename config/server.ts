export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"), // Reads from APP_KEYS env variable
  },
  // Enable/disable cron jobs based on environment variable
  cron: {
    enabled: env.bool("CRON_ENABLED", true),
  },
  // Add server role for logging and debugging
  serverRole: env("STRAPI_ROLE", "primary"),
});
