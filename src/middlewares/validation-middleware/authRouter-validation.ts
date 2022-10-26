import {body} from "express-validator";

export const loginValidation = body('login').isString().trim()
export const passwordValidation = body('password').isString().trim()