import {NextFunction, Request, Response} from "express";
import {usersRepository} from "../../repositories/users-repository";

export const loginOrEmailExistValidation = async (req: Request, res: Response, next: NextFunction) => {
    const userExist = await usersRepository.giveUserByLoginAndEmail(req.body.login, req.body.email)
    let error

    if (!userExist!.login === req.body.login) {
        throw new Error ('User with this login already exists')
        error = 'login'
    }

    if (!userExist!.email === req.body.email) {
        throw new Error ('User with this email already exists')
        error = 'email'
    }

    if (userExist) {
        return res.status(400).send({
            errorsMessages: [{
                message: `User with this ${error} already exists`, field: error
            }]
        })
    }

    next()
}