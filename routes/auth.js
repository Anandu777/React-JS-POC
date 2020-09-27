const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const User = require('../models/user')
const auth = require('../middleware/auth')

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
   async (req, res) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      try {
         let { email, password } = req.body

         let user = await User.findOne({ email: email.toLowerCase() })
         if (user) {
            return res
               .status(400)
               .json({ errors: [{ msg: 'User already exists' }] })
         }

         // Encrypt password
         const salt = await bcrypt.genSalt(10)
         password = await bcrypt.hash(password, salt)

         user = new User({
            email: email.toLowerCase(),
            password,
         })

         await user.save()

         // Generate token
         jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
               if (err) {
                  throw err
               }
               res.json({
                  token,
                  user: {
                     _id: user._id,
                     email: user.email,
                     date: user.date,
                  },
               })
            }
         )
      } catch (err) {
         console.error(err.message)
         res.status(500).send('Server Error!')
      }
   }
)

// Login user
router.post(
   '/login',
   [
      check('email', 'Email is required!').not().isEmpty(),
      check('password', 'Password is required!').not().isEmpty(),
   ],
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      try {
         const { email, password } = req.body

         // See if user exists
         let user = await User.findOne({ email: email.toLowerCase() })

         if (!user) {
            return res
               .status(401)
               .json({ errors: [{ msg: 'Invalid Credentials!' }] })
         }

         // Compare passwords
         const isMatch = await bcrypt.compare(password, user.password)

         if (!isMatch) {
            return res
               .status(401)
               .json({ errors: [{ msg: 'Invalid Credentials!' }] })
         }

         // Generate token
         jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
               if (err) {
                  throw err
               }
               res.json({
                  token,
                  user: {
                     _id: user._id,
                     email: user.email,
                     date: user.date,
                  },
               })
            }
         )
      } catch (err) {
         console.error(err.message)
         res.status(500).send('Server Error!')
      }
   }
)

// Get authenticated user's details
router.get('/getuser', [auth], async (req, res) => {
   try {
      const user = await User.findById(req.user._id).select(['-password'])
      res.json(user)
   } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
   }
})

// Change password
router.patch(
   '/changepassword',
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
   async (req, res) => {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() })
      }

      try {
         let { oldPassword, password } = req.body

         const user = await User.findById(req.user._id)

         const isMatch = await bcrypt.compare(oldPassword, user.password)

         if (!isMatch) {
            return res
               .status(401)
               .json({ errors: [{ msg: 'Old password does not match!' }] })
         }

         // Encrypt password
         const salt = await bcrypt.genSalt(10)
         password = await bcrypt.hash(password, salt)

         user.password = password

         await user.save()

         res.json({ msg: 'Password has been changed successfully!' })
      } catch (err) {
         console.error(err.message)
         res.status(500).send('Server Error!')
      }
   }
)

module.exports = router
