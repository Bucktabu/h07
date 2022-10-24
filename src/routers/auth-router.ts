import {Request, Response, Router} from "express";
import {usersService} from "../domain/user-service";
import {getAuthRouterMiddleware, postAuthRouterMiddleware} from "../middlewares/authRouter-middleware";
import {jwsService} from "../application/jws-service";
import nodemailer from 'nodemailer'

export const authRouter = Router({})

authRouter.post('/login',
    postAuthRouterMiddleware,
    async (req: Request, res: Response) => {

        const user = await usersService.checkCredential(req.body.login, req.body.password)

        if (!user) {
            return res.sendStatus(401)
        }

        const token = await jwsService.createJWT(user)

        return res.status(200).send({accessToken: token})
    }
)

authRouter.post('/registration-email-resending', (req: Request, res: Response) => {

})

authRouter.post('/registration', async (req: Request, res: Response) => {
    let transport = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'buckstabu030194@gmail.com',
            pass: 'czxfvurrxhdrghmz',
        }
    })

    let info = await transport.sendMail({
        from: 'Stanislav <buckstabu030194@gmail.com>',
        to: req.body.email,
        subject: req.body.subject,
        html: req.body.message
    })

    res.send({
        "email": req.body.email,
        "message": req.body.message,
        "subject": req.body.subject
    })
})

authRouter.post('/registration-confirmation', async (req: Request, res: Response) => {

})

authRouter.get('/me',
    getAuthRouterMiddleware,
    async (req: Request, res: Response) => {
        const aboutMe = usersService.aboutMe(req.user!)

        return res.status(200).send(aboutMe)
    }
)