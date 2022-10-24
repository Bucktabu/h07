import {authentication} from "./validation-middleware/authentication";
import {bodyAuthRouterValidation} from "./validation-middleware/authRouter-validation";
import {inputValidation} from "./validation-middleware/input-validation";

export const getAuthRouterMiddleware = [authentication]
export const postAuthRouterMiddleware = [...bodyAuthRouterValidation, inputValidation]