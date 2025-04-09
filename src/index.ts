import { Hono } from "hono";
import { createClient } from "redis";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { transporter } from "./controllers/sendEmail";

const app = new Hono();

const redis = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!),
  },
});

redis.on("error", (err) => console.error("Redis Client Error", err));
redis.on("connect", () => console.log("Connected to Redis"));
redis.on("ready", () => console.log("Redis is ready to accept commands"));
redis.on("reconnecting", () => console.log("Reconnecting to Redis..."));

const connectRedis = async () => {
  try {
    await redis.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    setTimeout(connectRedis, 5000);
  }
};
connectRedis();

app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => {
  return c.json({
    message: "Welcome to Hono API with Bun and Redis Cloud!",
    status: "running",
  });
});

app.get("/api/redis/health", async (c) => {
  try {
    const ping = await redis.ping();
    return c.json({ status: "connected", ping });
  } catch (error) {
    return c.json({ status: "disconnected", error: error.message }, 500);
  }
});

app.post("/api/request", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (email === undefined) {
      return c.json({ error: "Email is required" }, 400);
    }
    const otp = Math.floor(10000 + Math.random() * 90000);

    const email_exist = await redis.exists(email);

    if (email_exist === 0) {
      await transporter.sendMail({
        from: '"Memora" <dabresharian@gmail.com>',
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is: ${otp}`,
      });
      await redis.set(email, otp, { EX: 60 });

      return c.json({ result: true, error: null }, 200);
    }
    return c.json({ result: false, error: "otp already sent!" }, 200);
  } catch (error: any) {
    return c.json({ result: false, error: error.message }, 500);
  }
});

app.post("/api/validate", async (c) => {
  try {
    const body = await c.req.json();
    const { email, otp } = body;

    if (email === undefined) {
      return c.json({ error: "Email is required" }, 400);
    }
    const val_otp = await redis.get(email);

    if (parseInt(val_otp!) !== parseInt(otp)) {
      return c.json({ result: false, error: "otp is invalid" }, 200);
    }
    await redis.del(email);
    return c.json({ result: true, error: null }, 200);
  } catch (error: any) {
    return c.json({ result: false, error: error.message }, 500);
  }
});

process.on("SIGINT", async () => {
  console.log("Closing Redis connection...");
  try {
    if (redis.isOpen) {
      await redis.quit();
    }
  } catch (err: any) {
    console.error("Error during Redis shutdown:", err.message);
  } finally {
    process.exit(0);
  }
});

const port = process.env.PORT || 3000;
console.log(`Server is running on http://localhost:${port}`);

export default app;
