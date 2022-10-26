import {authentication} from "./validation-middleware/authentication";
import {inputValidation} from "./validation-middleware/input-validation";
import {userEmailValidation,
        userLoginValidation,
        userPasswordValidation} from "./validation-middleware/userRouter-validation";

export const getAuthRouterMiddleware = [authentication]
export const postAuthRouterMiddleware = [userLoginValidation, userPasswordValidation, userEmailValidation, inputValidation]
export const postRegistrationMiddleware = [userLoginValidation, userPasswordValidation, userEmailValidation, inputValidation]
export const postResendingRegistrationEmailMiddleware = [userEmailValidation, inputValidation]