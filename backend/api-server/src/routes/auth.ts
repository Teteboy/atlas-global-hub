import { Router } from "express";
import { validateCredentials } from "../middleware/auth";
import type { Request, Response } from "express";

const isProduction = process.env.NODE_ENV === "production";
const COOKIE_NAME = "adminToken";

const router = Router();

router.post("/auth/login", (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (!validateCredentials(email, password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.cookie(COOKIE_NAME, "authenticated", {
    signed: true,
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.json({ authenticated: true, email });
});

router.post("/auth/logout", (req: Request, res: Response) => {
  res.clearCookie(COOKIE_NAME);
  return res.json({ authenticated: false });
});

router.get("/auth/me", (req: Request, res: Response) => {
  const token = req.signedCookies?.adminToken;
  if (token === "authenticated") {
    return res.json({ authenticated: true });
  }
  return res.json({ authenticated: false });
});

export default router;
