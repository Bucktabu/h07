import {emailConfirmCollection, usersCollection} from "./db";
import {EmailConfirmationType} from "../types/email-confirmation-type";
import {emailsManager} from "../managers/email-manager";
import add from "date-fns/add";

export const emailConfirmationRepository = {
    async createEmailConfirmation(emailConfirmation: EmailConfirmationType) {
        try {
            return await emailConfirmCollection.insertOne(emailConfirmation)
        } catch (e) {
            return null
        }
    },

    async giveEmailConfirmationByCodeOrId(codeOrId: string): Promise<EmailConfirmationType | null> {
        return await emailConfirmCollection
            .findOne({$or: [{confirmationCode: codeOrId}, {id: codeOrId}]})
    },

    async updateConfirmation(confirmationCode: string) {
        let result = await emailConfirmCollection
            .updateOne({confirmationCode}, {$set: {isConfirmed: true}})

        return result.modifiedCount === 1
    },

    async updateConfirmationCode(id: string, confirmationCode: string) {
        let result = await emailConfirmCollection
            .updateOne({id}, {$set: {confirmationCode, expirationDate: add(new Date(), {hours: 24})}})

        return result.modifiedCount === 1
    },

    async deleteAllEmailConfirmation(): Promise<boolean> {
        try {
            await emailConfirmCollection.deleteMany({})
            return true
        } catch (e) {
            console.log('blogsCollection => deleteAllBlogs =>', e)
            return false
        }
    }
}