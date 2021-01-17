const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const auth = require('../../middleware/auth')

const registerHandler = require('./handlers/registerHandler')
const loginHandler = require('./handlers/loginHandler')
const authenticatedUserDetailsHandler = require('./handlers/authenticatedUserDetailsHandler')
const changePasswordHandler = require('./handlers/changePasswordHandler')

// Register user
router.post(
   '/register',
   [
      check('email', 'Email is required!').not().isEmpty(),
      check(
         'password',
         'Please enter password with 6 or more characters!'
      ).isLength({ min: 6 }),
   ],
   registerHandler
)

// Login user
router.post(
   '/login',
   [
      check('email', 'Email is required!').not().isEmpty(),
      check('password', 'Password is required!').not().isEmpty(),
   ],
   loginHandler
)

// Get authenticated user's details
router.get('/get-user', auth, authenticatedUserDetailsHandler)

// Change password
router.patch(
   '/change-password',
   [
      auth,
      [
         check('oldPassword', 'Old password is required').not().isEmpty(),
         check(
            'password',
            'Please enter password with 6 or more characters'
         ).isLength({ min: 6 }),
      ],
   ],
   changePasswordHandler
)

module.exports = router
