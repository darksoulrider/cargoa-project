
import nodemailer from 'nodemailer'
import fs from 'fs'



const orderCreationMail = async (email) => {
    let GMAIL_PASS = process.env.GMAIL_PASSWORD
    let GMAIL_EMAIL = process.env.GMAIL_EMAIL

    let sendername = "cargoa-service"
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: GMAIL_EMAIL,
            pass: GMAIL_PASS
        }
    })

    try {
        let info = await transport.sendMail({
            from: GMAIL_EMAIL,
            to: email,
            subject: 'ORDER CREATION.',
            text: "ORDER HAS BEEN SUCCESFULLY CREATED"
        })
    } catch (error) {
        console.log("Error sending email")
    }
}
