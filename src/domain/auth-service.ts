import bcrypt from "bcrypt";
import {usersRepository} from "../repositories/users-repository";
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from 'uuid';
import add from "date-fns/add";
import {emailsManager} from "../managers/email-manager";
import {UserAccountDBType} from "../types/user-account-type";
import {_generateHash} from "../helperFunctions";
import any = jasmine.any;

export const authService = {
    async createUser(login: string, password: string, email: string) {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await _generateHash(password, passwordSalt)
        const userAccountId = uuidv4()

        const userAccount: UserAccountDBType = {
            _id: new ObjectId(),
            id: userAccountId,
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

        const createdAccount = await usersRepository.createUserAccount(userAccount)

        if (!createdAccount) {
            return null
        }

        const info = await emailsManager.sendConfirmationEmail(userAccount)
        return {userAccount: createdAccount, info}
    },

    async confirmEmail(code: string, emailConfirmation: any): Promise<boolean> {

        if (emailConfirmation.expirationDate < new Date()) {
            return false
        }

        return await usersRepository.updateConfirmation(emailConfirmation.id)
    }
}