import { body, validationResult} from 'express-validator';


export function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
export const registerValidator =[
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3})
      .withMessage( 'username must be at least 3 character'),

      body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Enter a Valid Email Id'),

      body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 6 })
      .withMessage('password must be at least 6 characters'),

      validate
];

