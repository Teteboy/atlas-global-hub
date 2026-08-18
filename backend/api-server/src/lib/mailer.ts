import nodemailer, { type Transporter } from "nodemailer";
import { db, siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "./logger";

const DEFAULT_NOTIFY_EMAIL = "contact@atlas-grc.com";

let transporter: Transporter | null | undefined;

function getTransporter(): Transporter | null {
  if (transporter !== undefined) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    logger.warn(
      "SMTP_HOST/SMTP_USER/SMTP_PASS are not fully configured. Contact form emails will not be sent.",
    );
    transporter = null;
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });

  return transporter;
}

async function getNotifyEmail(): Promise<string> {
  try {
    const [row] = await db
      .select({ value: siteSettingsTable.value })
      .from(siteSettingsTable)
      .where(eq(siteSettingsTable.key, "contact.email"))
      .limit(1);

    return row?.value?.trim() || process.env.CONTACT_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;
  } catch {
    return process.env.CONTACT_NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;
  }
}

export interface ContactNotificationPayload {
  name: string;
  organization: string;
  email: string;
  country: string;
  subject: string;
  needType: string;
  message: string;
  lang?: string | null;
}

export async function sendContactNotification(payload: ContactNotificationPayload): Promise<void> {
  const client = getTransporter();
  if (!client) return;

  const to = await getNotifyEmail();
  const from = process.env.MAIL_FROM || process.env.SMTP_USER || DEFAULT_NOTIFY_EMAIL;

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Organization:</strong> ${escapeHtml(payload.organization)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Country:</strong> ${escapeHtml(payload.country)}</p>
    <p><strong>Need type:</strong> ${escapeHtml(payload.needType)}</p>
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    await client.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject: `New contact form submission: ${payload.subject}`,
      html,
    });
  } catch (err) {
    logger.error({ err }, "Failed to send contact notification email");
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
