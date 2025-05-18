/**
 * `read-only` middleware
 * Blocks write operations on backup server
 */

// Remove the incorrect import
// import { Strapi } from '@strapi/strapi';

export default (config, { strapi }) => {
  return async (ctx, next) => {
    // Only apply this middleware on the backup server
    if (process.env.STRAPI_ROLE === "backup") {
      // Get the request method
      const method = ctx.request.method;

      // Block all write operations (POST, PUT, PATCH, DELETE)
      if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        // Allow authentication requests to pass through
        if (ctx.request.url.startsWith("/api/auth/")) {
          console.log(
            `[read-only] Allowing auth request: ${method} ${ctx.request.url}`
          );
          return await next();
        }

        // Log blocked requests
        console.log(
          `[read-only] Blocking request: ${method} ${ctx.request.url}`
        );

        // Return a 403 Forbidden response
        ctx.status = 403;
        return ctx.send({
          error: true,
          message:
            "This server is in read-only mode. Write operations are disabled.",
          serverRole: process.env.STRAPI_ROLE,
        });
      }
    }

    // For all other cases, continue to the next middleware
    await next();
  };
};
