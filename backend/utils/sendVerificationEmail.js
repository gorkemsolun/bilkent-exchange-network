import { emailTokenDB } from "../models/emailToken.js";
import nodemailer from "nodemailer"


const createMailTransporter = () => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "bilkent.exchange.network@gmail.com",
            pass: "ciym glmn kdpi mbfp"
        }
    });
    return transporter
}

export const sendVerificationMail = async (username, email) => {
    const token = await emailTokenDB.createToken()
    console.log(token.emailToken)
    const transporter = createMailTransporter()

        const MailOptions = {
            from: "Bilkent Exchange Network",
            to: email,
            subject: "Verify your email.",
            html: `<p> Hi ${username}, please verify your email by clicking this link </p> 
                <a href = 'http://localhost:5173/signup?emailToken=${token.emailToken}&email=${email}'>Verify Your Email</a> `
        }
    transporter.sendMail(MailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Verification mail sent")
        }
    })
    
    
}