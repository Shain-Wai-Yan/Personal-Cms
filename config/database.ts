import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres"); // Set default to postgres
  const isBackupServer = env("STRAPI_ROLE") === "backup";

  const connections = {
    mysql: {
      /* Keep your MySQL config as-is */
    },
    postgres: {
      connection: {
        connectionString: env("DATABASE_URL"), // Will use Neon connection string if provided
        host: env(
          "DATABASE_HOST",
          "ep-black-scene-a1xezuor-pooler.ap-southeast-1.aws.neon.tech"
        ),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "neondb"),
        user: env("DATABASE_USERNAME", "neondb_owner"),
        password: env("DATABASE_PASSWORD", "npg_UZKdT24qAjLf"),
        ssl: env.bool("DATABASE_SSL", true) // Set default to true for Neon
          ? {
              rejectUnauthorized: env.bool(
                "DATABASE_SSL_REJECT_UNAUTHORIZED",
                true // Set default to true for Neon
              ),
            }
          : false,
        schema: env("DATABASE_SCHEMA", "public"),
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 0), // Reduced min pool for serverless
        max: env.int("DATABASE_POOL_MAX", 10),
        acquireTimeoutMillis: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
        createTimeoutMillis: env.int("DATABASE_CREATE_TIMEOUT", 30000),
        destroyTimeoutMillis: env.int("DATABASE_DESTROY_TIMEOUT", 5000),
        idleTimeoutMillis: env.int("DATABASE_IDLE_TIMEOUT", 30000),
        reapIntervalMillis: env.int("DATABASE_REAP_INTERVAL", 1000),
        createRetryIntervalMillis: env.int(
          "DATABASE_CREATE_RETRY_INTERVAL",
          200
        ),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
      // Only run migrations on primary server
      settings: {
        runMigrations: !isBackupServer,
        forceMigration: !isBackupServer,
      },
    },
  };
};
