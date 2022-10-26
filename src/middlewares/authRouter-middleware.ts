import {authentication} from "./validation-middleware/authentication";
import {inputValidation} from "./validation-middleware/input-validation";
import {emailValidationForAuthRouter,
        userBodyParemetersValidation} from "./validation-middleware/userRouter-validation";

export const getAuthRouterMiddleware = [authentication]
export const postAuthRouterMiddleware = [...userBodyParemetersValidation, inputValidation]
export const postRegistrationMiddleware = [...userBodyParemetersValidation, inputValidation]
export const postResendingRegistrationEmailMiddleware = [...emailValidationForAuthRouter, inputValidation]