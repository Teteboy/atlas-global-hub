import type { Request, Response, NextFunction } from "express";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const isDev = process.env.NODE_ENV !== "production";

export function validateCredentials(email: string, password: string): boolean {
  const expectedEmail = ADMIN_EMAIL || (isDev ? "admin@atlas.com" : "");
  const expectedPassword = ADMIN_PASSWORD || (isDev ? "admin123" : "");

  if (!expectedEmail || !expectedPassword) return false;

  // constant-time-ish comparison to avoid timing attacks
  let emailMatch = email.length === expectedEmail.length;
  let passMatch = password.length === expectedPassword.length;

  for (let i = 0; i < Math.max(email.length, expectedEmail.length); i++) {
    if (email[i] !== expectedEmail[i]) emailMatch = false;
  }
  for (let i = 0; i < Math.max(password.length, expectedPassword.length); i++) {
    if (password[i] !== expectedPassword[i]) passMatch = false;
  }

  return emailMatch && passMatch;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.signedCookies?.adminToken;

  if (!token || typeof token !== "string" || token !== "authenticated") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
  return;
}
