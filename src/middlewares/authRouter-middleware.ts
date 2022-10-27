import {authentication} from "./validation-middleware/authentication";
import {inputValidation} from "./validation-middleware/input-validation";
import {userEmailValidation,
        userLoginValidation,
        userPasswordValidation} from "./validation-middleware/userRouter-validation";
import {authEmailValidation,
        authLoginValidation,
        authPasswordValidation} from "./validation-middleware/authRouter-validation";
//import {loginOrEmailExistValidation} from "./validation-middleware/loginOrEmailExistValidation";

export const getAuthRouterMiddleware = [authentication]
export const postAuthRouterMiddleware = [userLoginValidation, userPasswordValidation, inputValidation]
export const postRegistrationMiddleware = [authLoginValidation, authPasswordValidation, authEmailValidation, inputValidation]
export const postResendingRegistrationEmailMiddleware = [userEmailValidation, inputValidation]