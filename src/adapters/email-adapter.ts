import nodemailer from "nodemailer";

export const emailAdapters = {
     sendEmail(email: string, subject: string, messege: string) {
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'buckstabu030194@gmail.com',
                pass: 'czxfvurrxhdrghmz',
            }
        })

        let info = transport.sendMail({
            from: 'MyBack-End <buckstabu030194@gmail.com>',
            to: email,
            subject: subject,
            html: messege
        })

        return info
    }
}