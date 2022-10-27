import {body} from "express-validator";
import {usersRepository} from "../../repositories/users-repository";
import {emailConfirmationRepository} from "../../repositories/emailConfirmation-repository";

export const authLoginValidation = body('login').isString().trim().isLength({min: 3, max: 10})
    .custom(async (login: string) => {
        const loginExist = await usersRepository.giveUserByLoginOrEmail(login)

        if (loginExist) {
            throw new Error('User with this login already exists')
        }

        return true
    }
)

export const authEmailValidation = body('email').isString().trim().isEmail()
    .custom(async (email: string) => {
        const emailExist = await usersRepository.giveUserByLoginOrEmail(email)

        if (emailExist) {
            throw new Error('User with this email already exists')
        }

        return true
    }
)

export const confirmationCodeValidation = body('code').isString().trim()
    .custom(async (code: string) => {
        const userEmailConfirmation = await emailConfirmationRepository.giveEmailConfirmationByCodeOrId(code)

        if (!userEmailConfirmation) {
            throw new Error('Not valid code')
        }

        if (userEmailConfirmation.expirationDate < new Date()) {
            throw new Error('Your code has expired. Try to register again')
        }

        if (userEmailConfirmation.isConfirmed) {
            throw new Error('Your account is already verified')
        }

        return true
    }
)

export const authPasswordValidation = body('password').isString().trim().isLength({min: 6, max: 20})
