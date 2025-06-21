import nodemailer from "nodemailer"
import { env } from "../libs/env"
import SMTPTransport from "nodemailer/lib/smtp-transport"
import { logger } from "../libs/logger"

const sendVerificationEmail = async (email: string, token: string){
    try {
        const transporter = nodemailer.createTransport(<SMTPTransport.Options>{
            host: env.EMAIL_HOST,
            port: env.EMAIL_PORT,
            secure: true,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS,
            }
        })

        // verificationURl
        const verificationUrl = `${env.BASE_URL}/api/v1/user/verify/${token}`

        // email content

        const mailOptions = {
            from: `Book Bazar <${env.SENDER_EMAIL}>`,
            to: email,
            subject: "Please verify your email address",
            text: `
        Thank you for reistering! please Verify your email address to complete your registration. 
        ${verificationUrl}
        this verification link will expire in 10 mins`,
        }

        // send email
        const data = await transporter.sendMail(mailOptions)
        logger.info("verification email sent : %s ", data.messageId);
        return true


    } catch (err) {
        logger.error("error while sending email", err)
        return false;

    }
}

export default sendVerificationEmail