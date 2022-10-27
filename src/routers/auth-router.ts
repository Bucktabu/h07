import {Request, Response, Router} from "express";
import {authService} from "../domain/auth-service";
import {jwsService} from "../application/jws-service";
import {usersService} from "../domain/user-service";
import {
    getAuthRouterMiddleware,
    postAuthRouterMiddleware, registrationConfirmationMiddleware,
    registrationMiddleware,
    resendingRegistrationEmailMiddleware
} from "../middlewares/authRouter-middleware";
import {confirmationCodeValidation} from "../middlewares/validation-middleware/authRouter-validation";

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
    ...registrationMiddleware,
    async (req: Request, res: Response) => {

        const result = await authService.createUser(req.body.login, req.body.password, req.body.email)

        return res.status(204).send({result})
    }
)

authRouter.post('/registration-confirmation',
    registrationConfirmationMiddleware,
    async (req: Request, res: Response) => {

        const emailConfirmed = await authService.confirmEmail(req.body.code)

        if (!emailConfirmed) {
            return res.sendStatus(404)
        }

        return res.status(204).send({emailConfirmed})
    }
)

authRouter.post('/registration-email-resending',
    ...resendingRegistrationEmailMiddleware,
    async (req: Request, res: Response) => {
        const result = await authService.resendConfirmRegistration(req.body.email)

        return res.status(204).send({result})
    }
)

authRouter.get('/me',
    getAuthRouterMiddleware,
    async (req: Request, res: Response) => {
        const aboutMe = usersService.aboutMe(req.user!)

        return res.status(200).send({aboutMe})
    }
)