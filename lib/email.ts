import { Resend } from "resend";

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY;
const isEmailConfigured = !!resendApiKey;

export const resend = isEmailConfigured ? new Resend(resendApiKey) : null;

// Email templates
const WELCOME_EMAIL_TEMPLATE = (email: string, position: number, total: number) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        background-color: #000000;
        color: #ffffff;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #0a0a0a;
        border: 1px solid #CCFF00;
        border-radius: 4px;
        padding: 40px;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo {
        font-size: 24px;
        font-weight: bold;
        color: #CCFF00;
        font-family: 'Courier New', monospace;
        letter-spacing: 2px;
      }
      h1 {
        font-size: 28px;
        margin: 20px 0;
        color: #ffffff;
        font-family: 'Courier New', monospace;
      }
      .position {
        background-color: rgba(204, 255, 0, 0.1);
        border: 2px solid #CCFF00;
        border-radius: 4px;
        padding: 20px;
        margin: 20px 0;
        text-align: center;
      }
      .position-number {
        font-size: 48px;
        font-weight: bold;
        color: #CCFF00;
        font-family: 'Courier New', monospace;
      }
      .position-label {
        color: #CCFF00;
        font-size: 14px;
        margin-top: 10px;
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
      }
      .content {
        color: #ffffff;
        line-height: 1.6;
        margin: 20px 0;
      }
      .stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin: 20px 0;
      }
      .stat {
        background-color: rgba(204, 255, 0, 0.1);
        border: 1px solid #CCFF00;
        padding: 15px;
        border-radius: 4px;
        text-align: center;
      }
      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #CCFF00;
        font-family: 'Courier New', monospace;
      }
      .stat-label {
        font-size: 12px;
        color: #CCFF00;
        margin-top: 8px;
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
      }
      .cta {
        text-align: center;
        margin: 30px 0;
      }
      .button {
        display: inline-block;
        background-color: #CCFF00;
        color: #000000;
        padding: 12px 30px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: bold;
        font-family: 'Courier New', monospace;
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: 1px;
      }
      .footer {
        border-top: 1px solid rgba(204, 255, 0, 0.2);
        margin-top: 30px;
        padding-top: 20px;
        color: #CCFF00;
        font-size: 12px;
        text-align: center;
        font-family: 'Courier New', monospace;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">CHECKFLOW</div>
        <h1>YOU'RE ON THE LIST!</h1>
      </div>

      <div class="content">
        <p>Hello,</p>
        <p>Thank you for joining the CheckFlow AI waitlist. We're building the future of AI-powered workflow automation, and we're excited to have you along for the ride.</p>
      </div>

      <div class="position">
        <div class="position-number">#${position}</div>
        <div class="position-label">Your Position in Queue</div>
      </div>

      <div class="stats">
        <div class="stat">
          <div class="stat-value">${total}</div>
          <div class="stat-label">Total on Waitlist</div>
        </div>
        <div class="stat">
          <div class="stat-value">${position}</div>
          <div class="stat-label">Your Position</div>
        </div>
      </div>

      <div class="content">
        <p><strong>What's coming:</strong></p>
        <ul>
          <li>AI-powered workflow generation from natural language</li>
          <li>Visual node-based workflow editor</li>
          <li>Real-time execution with smart checklists</li>
          <li>50+ integrations out of the box</li>
          <li>Team collaboration features</li>
        </ul>
      </div>

      <div class="cta">
        <a href="https://checkflow.ai" class="button">Check Out CheckFlow</a>
      </div>

      <div class="content">
        <p>Stay tuned for updates! We'll notify you as soon as early access becomes available.</p>
        <p>Cheers,<br/>The CheckFlow Team</p>
      </div>

      <div class="footer">
        <p>© 2026 CheckFlow AI. All rights reserved.</p>
        <p>You received this email because you signed up for the waitlist at checkflow.ai</p>
      </div>
    </div>
  </body>
</html>
`;

// Email service functions
export const emailService = {
  // Send welcome email to waitlist signup
  async sendWelcomeEmail(email: string, position: number, total: number) {
    try {
      if (!resend) {
        console.warn("[v0] Email service not configured (RESEND_API_KEY missing)");
        return { success: true, message: "Email service not configured" };
      }

      const result = await resend.emails.send({
        from: "CheckFlow <noreply@checkflow.ai>",
        to: email,
        subject: `Welcome to CheckFlow AI! You're #${position} on the waitlist`,
        html: WELCOME_EMAIL_TEMPLATE(email, position, total),
      });

      if (result.error) {
        console.error("[v0] Failed to send welcome email:", result.error);
        return { success: false, error: result.error.message };
      }

      console.log("[v0] Welcome email sent successfully to:", email);
      return { success: true, data: result.data };
    } catch (error) {
      console.error("[v0] Error sending welcome email:", error);
      return { success: false, error: "Failed to send email" };
    }
  },

  // Send verification email
  async sendVerificationEmail(email: string, verificationLink: string) {
    try {
      if (!resend) {
        console.warn("[v0] Email service not configured");
        return { success: true };
      }

      const result = await resend.emails.send({
        from: "CheckFlow <noreply@checkflow.ai>",
        to: email,
        subject: "Verify your CheckFlow AI email",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body {
                  font-family: 'Courier New', monospace;
                  background-color: #000000;
                  color: #CCFF00;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #0a0a0a;
                  border: 2px solid #CCFF00;
                  padding: 40px;
                }
                .button {
                  background-color: #CCFF00;
                  color: #000000;
                  padding: 12px 30px;
                  border-radius: 4px;
                  text-decoration: none;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>VERIFY YOUR EMAIL</h1>
                <p>Click the link below to verify your email address:</p>
                <a href="${verificationLink}" class="button">VERIFY EMAIL</a>
                <p>Or copy and paste this link:<br/>${verificationLink}</p>
              </div>
            </body>
          </html>
        `,
      });

      if (result.error) {
        return { success: false, error: result.error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("[v0] Error sending verification email:", error);
      return { success: false, error: "Failed to send verification email" };
    }
  },
};

export type EmailService = typeof emailService;
