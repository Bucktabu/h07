import {authentication} from "./validation-middleware/authentication";
import {bodyAuthRouterValidation} from "./validation-middleware/authRouter-validation";
import {inputValidation} from "./validation-middleware/input-validation";
import {emailValidationForAuthRouter,
        userBodyParemetersValidation} from "./validation-middleware/userRouter-validation";

export const getAuthRouterMiddleware = [authentication]
export const postAuthRouterMiddleware = [...bodyAuthRouterValidation, inputValidation]
export const postRegistrationMiddleware = [...userBodyParemetersValidation]
//export const postConfirmRegistrationMiddleware = [confirmRegistrationValidation]
export const postResendingRegistrationEmailMiddleware = [...emailValidationForAuthRouter, inputValidation]