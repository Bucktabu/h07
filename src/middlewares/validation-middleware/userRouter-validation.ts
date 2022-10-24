import {body} from "express-validator";

const loginValidation = body('login').isString().trim().isLength({min: 3, max: 10})
const passwordValidation = body('password').isString().trim().isLength({min: 6, max: 20})
const emailValidation = body('email').isString().trim().notEmpty().isEmail()

export const bodyUsersRouterValidation = [loginValidation, passwordValidation, emailValidation]