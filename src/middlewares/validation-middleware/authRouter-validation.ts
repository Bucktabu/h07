import {body} from "express-validator";

const loginValidation = body('login').isString().trim()
const passwordValidation = body('password').isString().trim()

export const bodyAuthRouterValidation = [loginValidation, passwordValidation]