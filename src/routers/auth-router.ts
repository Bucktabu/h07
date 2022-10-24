import {Request, Response, Router} from "express";
import {usersService} from "../domain/user-service";
import {getAuthRouterMiddleware, postAuthRouterMiddleware} from "../middlewares/authRouter-middleware";
import {authentication} from "../middlewares/validation-middleware/authentication";
import {jwsService} from "../application/jws-service";


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

authRouter.get('/me',
    getAuthRouterMiddleware,
    async (req: Request, res: Response) => {
        const aboutMe = usersService.aboutMe(req.user!)

        return res.status(200).send(aboutMe)
    }
)