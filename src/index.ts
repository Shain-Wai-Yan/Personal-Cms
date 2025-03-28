// src/index.ts
import type { Core } from "@strapi/strapi";

async function triggerVercelDeploy() {
  const vercelHook = process.env.VERCEL_DEPLOY_HOOK;
  if (!vercelHook) return;

  try {
    await fetch(vercelHook, { method: "POST" });
    console.log("✅ Vercel deploy triggered!");
  } catch (error) {
    console.error("❌ Failed to trigger Vercel deploy:", error);
  }
}

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      afterCreate: async () => await triggerVercelDeploy(),
      afterUpdate: async () => await triggerVercelDeploy(),
      afterDelete: async () => await triggerVercelDeploy(),
    });
  },
  bootstrap() {},
};
