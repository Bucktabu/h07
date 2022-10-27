import {NextFunction, Request, Response} from "express";
import {usersRepository} from "../../repositories/users-repository";
import {emailConfirmationRepository} from "../../repositories/emailConfirmation-repository";

export const resendingEmailValidation = async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersRepository.giveUserByLoginOrEmail(req.body.email)

    if (!user) {
        return res.status(400).send({errorsMessages: [{message: 'User with this email not exists', field: "email"}]})
    }

    const userEmailConfirmation = await emailConfirmationRepository.giveEmailConfirmationByCodeOrId(req.body.email)

    if (userEmailConfirmation!.isConfirmed) {
        return res.status(400).send({errorsMessages: [{message: 'Your account is already verified', field: "email"}]})
    }

    req.body.userAccount = {accountData: user, emailConfirmation: userEmailConfirmation}
    next()
}