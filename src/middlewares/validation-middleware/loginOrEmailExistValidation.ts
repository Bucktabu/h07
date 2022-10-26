import {NextFunction, Request, Response} from "express";
import {usersRepository} from "../../repositories/users-repository";

export const loginOrEmailExistValidation = async (req: Request, res: Response, next: NextFunction) => {
    const userExist = await usersRepository.giveUserByLoginAndEmail(req.body.login, req.body.email)

    if (!userExist!.login === req.body.login) {
        throw new Error ('User with this login already exists')
    }

    if (!userExist!.email === req.body.email) {
        throw new Error ('User with this email already exists')
    }

    return true
}