const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const sendError = require('../utils/sendError')
const { UNAUTHORIZED } = require('../utils/statusCodes')
const ErrorHandler = require('../utils/ErrorHandler')
const User = require('../models/user')

const auth = async (req, res, next) => {
   try {
      // Get token
      const token = req.header('x-auth-token')

      // Check if token exists
      if (!token) {
         throw new ErrorHandler(
            { errors: [{ msg: 'No token, authorization denied' }] },
            UNAUTHORIZED
         )
      }

      jwt.verify(token, JWT_SECRET, async (error, decoded) => {
         if (error) {
            throw new ErrorHandler(
               { errors: [{ msg: 'Token is not valid' }] },
               UNAUTHORIZED
            )
         }
         const { _id } = decoded
         const user = await User.findById(_id).select('-password')
         req.user = user
         next()
      })
   } catch (err) {
      sendError(res, err)
   }
}

module.exports = auth
