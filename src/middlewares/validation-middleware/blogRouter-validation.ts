import {body} from "express-validator";

const nameValidation = body('name').isString().trim().isLength({min: 3, max: 15})
const youtubeUrlValidation = body('youtubeUrl').isString().trim().isURL().isLength({min: 5, max: 100})


export const bodyBlogValidation = [nameValidation, youtubeUrlValidation]