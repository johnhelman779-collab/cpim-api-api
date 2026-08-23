import cors from "cors";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { requireAuth } from "./middleware/auth";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const authUrl = process.env.AUTH_URL ?? "http://localhost:3001";
const appUrl = process.env.APP_URL ?? "http://localhost:3002";
const exceptionsUrl = process.env.EXCEPTIONS_URL ?? "http://localhost:3004";

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);

app.get("/health", (_req, res) => {
  res.json({ service: "cpim-api-api", status: "ok", version: "0.1.1" });
});

/** Express strips the mount path; restore upstream path prefixes. */
function restorePath(upstreamPrefix: string) {
  return (path: string) => `${upstreamPrefix}${path === "/" ? "" : path}`;
}

// Public login
app.use(
  "/api/auth/login",
  createProxyMiddleware({
    target: authUrl,
    changeOrigin: true,
    pathRewrite: () => "/auth/login",
  })
);

// Protected validate
app.use("/api/auth/validate", requireAuth);
app.use(
  "/api/auth/validate",
  createProxyMiddleware({
    target: authUrl,
    changeOrigin: true,
    pathRewrite: () => "/auth/validate",
  })
);

app.use("/api/devices", requireAuth);
app.use(
  "/api/devices",
  createProxyMiddleware({
    target: appUrl,
    changeOrigin: true,
    pathRewrite: restorePath("/devices"),
  })
);

app.use("/api/exceptions", requireAuth);
app.use(
  "/api/exceptions",
  createProxyMiddleware({
    target: exceptionsUrl,
    changeOrigin: true,
    pathRewrite: restorePath("/exceptions"),
  })
);

app.listen(port, () => {
  console.log(`cpim-api-api gateway listening on http://localhost:${port}`);
});
