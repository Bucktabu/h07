import {authentication} from "./validation-middleware/authentication";
import {authenticationGuard} from "./validation-middleware/authentication-guard";
import {bodyPostValidationForPostsRouter} from "./validation-middleware/postRouter-validation";
import {commentsValidation} from "./validation-middleware/commentRouter-validation";
import {inputValidation} from "./validation-middleware/input-validation";
import {queryValidation} from "./validation-middleware/query-validation";

export const createCommentForPostsRouterMiddleware = [authentication, commentsValidation, inputValidation]
export const deletePostsRouterMiddleware = [authenticationGuard]
export const getPostsRouterMiddleware = [...queryValidation]
export const postsRouterMiddleware = [authenticationGuard, ...bodyPostValidationForPostsRouter, inputValidation]