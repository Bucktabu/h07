import {Request, Response, Router} from "express";
import {authService} from "../domain/auth-service";
import {jwsService} from "../application/jws-service";
import {usersService} from "../domain/user-service";
import {
    getAuthRouterMiddleware,
    postAuthRouterMiddleware,
    postConfirmRegistrationMiddleware,
    postRegistrationMiddleware, postResendingRegistrationEmailMiddleware
} from "../middlewares/authRouter-middleware";

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

authRouter.post('/registration',
    postRegistrationMiddleware,
    async (req: Request, res: Response) => {

        const result = await authService.createUser(req.body.login, req.body.password, req.body.email)

        if (!result!.userAccount) {
            return res.sendStatus(404)
        }

        return res.status(204).send(result)
    }
)

authRouter.post('/registration-confirmation',
    postConfirmRegistrationMiddleware,
    async (req: Request, res: Response) => {

    const code = await authService.confirmEmail(req.body.code, req.body.emailConfirmation)

    return res.status(204).send(code)
})

authRouter.post('/registration-email-resending',
    ...postResendingRegistrationEmailMiddleware,
    (req: Request, res: Response) => {

})

authRouter.get('/me',
    getAuthRouterMiddleware,
    async (req: Request, res: Response) => {
        const aboutMe = usersService.aboutMe(req.user!)

        return res.status(200).send(aboutMe)
    }
)