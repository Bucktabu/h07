import nodemailer from "nodemailer";

export const emailAdapters = {
    async sendEmail(email: string, subject: string, messege: string) {
        let transport = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'buckstabu030194@gmail.com',
                pass: 'czxfvurrxhdrghmz',
            }
        })

        let info = await transport.sendMail({
            from: 'Stanislav <buckstabu030194@gmail.com>',
            to: email,
            subject: subject,
            html: messege
        })

        console.log(info)
        return info
    }
}