import { Router } from "express";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { requireAuth } from "../middleware/auth";
import type { Request, Response } from "express";

const router = Router();

// esbuild bundles everything into a single dist/index.mjs, so import.meta.url
// resolves to that file for every module regardless of its original source path.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOAD_DIR = path.resolve(__dirname, "..", "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "image/avif"]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      cb(new Error("Unsupported file type"));
      return;
    }
    cb(null, true);
  },
});

// Admin: upload an image, returns its public URL
router.post("/uploads", requireAuth, upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  return res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

router.use((err: any, _req: Request, res: Response, _next: any) => {
  if (err instanceof multer.MulterError || err?.message === "Unsupported file type") {
    return res.status(400).json({ error: err.message });
  }
  return res.status(500).json({ error: "Upload failed" });
});

export default router;
