import bcrypt from "bcrypt";
import {usersRepository} from "../repositories/users-repository";
import {v4 as uuidv4} from 'uuid';
import add from "date-fns/add";
import {emailsManager} from "../managers/email-manager";
import {UserAccountType} from "../types/user-account-type";
import {_generateHash} from "../helperFunctions";
import {emailConfirmationRepository} from "../repositories/emailConfirmation-repository";
import {log} from "util";

export const authService = {
    async createUser(login: string, password: string, email: string) {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await _generateHash(password, passwordSalt)
        const userAccountId = uuidv4()

        const userAccount: UserAccountType = {
            accountData: {
                id: userAccountId,
                login,
                email,
                passwordSalt,
                passwordHash,
                createdAt: new Date().toISOString()
            },
            emailConfirmation: {
                id: userAccountId,
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1,
                    // minutes: 1,
                    // seconds: 1
                }),
                isConfirmed: false
            }
        }
        console.log('user', userAccount.accountData)
        console.log('email', userAccount.emailConfirmation)
        const createdAccount = await this.createUserAccount(userAccount)

        if (!createdAccount) {
            return null
        }

        const info = await emailsManager.sendConfirmationEmail(userAccount)
        return {userAccount: createdAccount, info}
    },

    async confirmEmail(code: string): Promise<boolean> {
        return await emailConfirmationRepository.updateConfirmation(code)
    },

    async resendConfirmRegistration(email: string) {
        const user = await usersRepository.giveUserByLoginOrEmail(email)

        if (!user) {
            return null
        }

        const emailConfirmation = await emailConfirmationRepository.giveEmailConfirmationByCodeOrId(user.id)

        if (emailConfirmation!.expirationDate < new Date()) {
            return null
        }

        if (emailConfirmation!.isConfirmed) {
            return null
        }

        const userAccount = {accountData: user!, emailConfirmation: emailConfirmation!}
        return emailsManager.sendConfirmationEmail(userAccount)
    },

    async createUserAccount(userAccount: UserAccountType) {
        const user = await usersRepository.createNewUser(userAccount.accountData)
        console.log('user', user)
        const emailConfirmation = await emailConfirmationRepository.createEmailConfirmation(userAccount.emailConfirmation)
        console.log('emailConfirmation', emailConfirmation)
        if (!user || !emailConfirmation) {
            console.log('createUserAccount - created fail')
            return null
        }

        return {accountData: user, emailConfirmation: emailConfirmation}
    }
}