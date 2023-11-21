import nodemailer from "nodemailer";
import fs from "fs";


const USER_EMAIL = "@gmail.com"
const USER_PWD = ""


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const sendInvitatinLink = async (email_to) => {
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: USER_EMAIL,
            pass: USER_PWD
        },

    });

    await delay(1000);
    try {
        let info = transport.sendMail({
            from: "Cargoa",
            to: `${email_to}`,
            subject:
                "Invitation link - cargoa",
            text: "Invitation link: http://127.0.0.1:4000/signup"
        });

        if (!info) {
            console.log("Failed to sent email = " + email_to);
        } else {
            console.log("Sent successfully email = " + email_to);
        }
    } catch (e) {
        console.log("Error occured sending email= " + email_to);
        console.log(`error => ${e.message}`);

    }
};



