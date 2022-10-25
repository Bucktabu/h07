import {WithId} from "mongodb";
import {EmailConfirmationType} from "./email-confirmation-type";
import {UserDBType} from "./user-type";

export type UserAccountDBType = WithId<{
    id: string,
    accountData: UserDBType,
    emailConfirmation: EmailConfirmationType
}>