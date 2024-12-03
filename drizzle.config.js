/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:JAze5p0wnGQk@ep-soft-mouse-a54o1nzp.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require",
  },
};
