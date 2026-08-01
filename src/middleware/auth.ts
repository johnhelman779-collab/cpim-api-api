import type { NextFunction, Request, Response } from "express";

const authUrl = process.env.AUTH_URL ?? "http://localhost:3001";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing Bearer token" });
    return;
  }

  try {
    const response = await fetch(`${authUrl}/auth/validate`, {
      headers: { Authorization: header },
    });
    const data = (await response.json()) as { valid?: boolean; error?: string };
    if (!response.ok || !data.valid) {
      res.status(401).json({ error: data.error ?? "Unauthorized" });
      return;
    }
    next();
  } catch (err) {
    res.status(502).json({
      error: "Auth service unavailable",
      detail: err instanceof Error ? err.message : String(err),
    });
  }
}
