import {NextFunction, Request, Response} from "express";
import {usersRepository} from "../../repositories/users-repository";
import {emailConfirmationRepository} from "../../repositories/emailConfirmation-repository";

export const resendingEmailValidation = async (req: Request, res: Response, next: NextFunction) => {
    const user = await usersRepository.giveUserByLoginOrEmail(req.body.email)

    if (!user) {
        throw new Error('User with this email not exists')
    }

    const userEmailConfirmation = await emailConfirmationRepository.giveEmailConfirmationByCodeOrId(req.body.email)

    if (userEmailConfirmation!.isConfirmed) {
        throw new Error('Your account is already verified')
    }
    req.body.userAccount = {accountData: user, emailConfirmation: userEmailConfirmation}
    return true
}