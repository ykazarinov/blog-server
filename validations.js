import {body} from 'express-validator'

export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password length must be at least 5 characters').isLength({min: 5}),

]

export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password length must be at least 5 characters').isLength({min: 5}),
    body('fullName', 'The name must be at least 5 characters long').isLength({min: 3}),
    body('avatarUrl', 'Invalid link format').optional().isURL({ require_tld: false })
]

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({min: 3}).isString(),
    body('text', 'Enter article text').isLength({min: 10}).isString(),
    body('tags', 'Invalid tag format (specify array)').optional().isString(),
    body('imageUrl', 'Invalid link format').optional().isString()
]