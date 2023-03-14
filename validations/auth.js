import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'Password length must be at least 5 characters').isLength({min: 5}),
    body('fullName', 'The name must be at least 5 characters long').isLength({min: 3}),
    body('avatarUrl', 'Invalid link format').optional().isURL()
]