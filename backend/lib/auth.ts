import { betterAuth } from "better-auth";
import { getPool } from "./db";
import { emailOTP } from "better-auth/plugins";
import { createTransport } from "nodemailer";

const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_user || process.env.SMTP_USER,
        pass: process.env.SMTP_pass || process.env.SMTP_PASS,
    },
});

export const auth = betterAuth({
    database: getPool(),
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                try {
                    await transporter.sendMail({
                        from: process.env.EMAIL_FROM || "SmartIrrigate <no-reply@smartirrigate.com>",
                        to: email,
                        subject: "Your Verification Code - SmartIrrigate",
                        html: `
                            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                <h2 style="color: #16A34A;">Verification Code</h2>
                                <p>Hello,</p>
                                <p>Use the following code to complete your login or registration:</p>
                                <div style="font-size: 24px; font-weight: bold; background-color: #F0FDF4; padding: 16px; border-radius: 8px; text-align: center; color: #166534; letter-spacing: 2px;">
                                    ${otp}
                                </div>
                                <p style="color: #666; font-size: 14px; margin-top: 24px;">This code will expire in 5 minutes.</p>
                            </div>
                        `,
                    });
                    console.log(`OTP sent to ${email}`);
                } catch (error) {
                    console.error("Failed to send OTP email:", error);
                    // Fallback log for dev
                    console.log(`fallback OTP for ${email}: ${otp}`);
                }
            },
        }),
    ],
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    emailAndPassword: {
        enabled: true,
    }
});
