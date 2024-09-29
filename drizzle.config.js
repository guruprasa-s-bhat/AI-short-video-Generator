/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://video-generator_owner:GzpUnMyY83aE@ep-weathered-surf-a5kkcv0u.us-east-2.aws.neon.tech/video-generator?sslmode=require",
  },
};
