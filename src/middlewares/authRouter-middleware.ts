import {authentication} from "./validation-middleware/authentication";
import {inputValidation} from "./validation-middleware/input-validation";
import {userEmailValidation,
        userLoginValidation,
        userPasswordValidation} from "./validation-middleware/userRouter-validation";
import {authEmailValidation,
        authLoginValidation,
        authPasswordValidation,
        confirmationCodeValidation} from "./validation-middleware/authRouter-validation";
import {resendingEmailValidation} from "./validation-middleware/resendingEmail-validation";
//import {loginOrEmailExistValidation} from "./validation-middleware/loginOrEmailExistValidation";

export const getAuthRouterMiddleware = [authentication]
export const postAuthRouterMiddleware = [userLoginValidation, userPasswordValidation, inputValidation]
export const registrationMiddleware = [authLoginValidation, authPasswordValidation, authEmailValidation, inputValidation]
export const registrationConfirmationMiddleware = [confirmationCodeValidation, inputValidation]
export const resendingRegistrationEmailMiddleware = [userEmailValidation, inputValidation/*, resendingEmailValidation*/]