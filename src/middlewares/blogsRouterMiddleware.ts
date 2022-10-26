import {authenticationGuard} from "./validation-middleware/authentication-guard";
import {bodyBlogValidation} from "./validation-middleware/blogRouter-validation";
import {bodyPostValidationForBlogsRouter} from "./validation-middleware/postRouter-validation";
import {inputValidation} from "./validation-middleware/input-validation";
import {queryValidation,
        queryWithNameTermValidation} from "./validation-middleware/query-validation";

export const createPostForBlogsRouterMiddleware = [authenticationGuard, ...bodyPostValidationForBlogsRouter, inputValidation]
export const deleteBlogsRouterMiddleware = [authenticationGuard]
export const getBlogsRouterMiddleware = [...queryWithNameTermValidation, inputValidation]
export const getPostForBlogsRouterMiddleware = [...queryValidation, inputValidation]
export const postBlogsRouterMiddleware = [authenticationGuard, ...bodyBlogValidation, inputValidation]
export const putBlogsRouterMiddleware = [authenticationGuard, ...bodyBlogValidation, inputValidation]