import {NextFunction, Request, Response} from "express";
import {usersRepository} from "../../repositories/users-repository";

export const confirmRegistrationValidation = async  (req: Request, res: Response, next: NextFunction) => {
    const emailConfirmation = await usersRepository.giveUserByConfirmationCode(req.body.code)

    if (!emailConfirmation) {
        return res.sendStatus(400)
    }

    req.body.emailConfirmation = {
        id: emailConfirmation.id,
        expirationDate: emailConfirmation.expirationDate
    }

    next()
}