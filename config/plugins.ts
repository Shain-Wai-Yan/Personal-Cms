// config/plugins.ts
export default ({ env }) => ({
  // Cloudinary configuration
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_CLOUD_NAME"),
        api_key: env("CLOUDINARY_API_KEY"),
        api_secret: env("CLOUDINARY_API_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  // Users-Permissions Plugin (JWT Secret)
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"), // Read from environment variable
    },
  },
});
