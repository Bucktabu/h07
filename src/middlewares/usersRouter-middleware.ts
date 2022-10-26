import {authenticationGuard} from "./validation-middleware/authentication-guard";
import {userBodyParemetersValidation} from "./validation-middleware/userRouter-validation";
import {inputValidation} from "./validation-middleware/input-validation";
import {usersQueryValidationMiddleware} from "./validation-middleware/query-validation";

export const deleteUsersRouter = [authenticationGuard]
export const getUsersRouterMiddleware = [...usersQueryValidationMiddleware, inputValidation]
export const postUsersRouterMiddleware = [authenticationGuard, ...userBodyParemetersValidation, inputValidation]