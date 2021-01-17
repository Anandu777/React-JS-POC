const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const sendResponse = require('../../../utils/sendResponse')
const { SUCCESS } = require('../../../utils/statusCodes')

module.exports = (res, user) => {
   jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
         if (err) {
            throw err
         }
         sendResponse(res, SUCCESS, {
            token,
            user: {
               _id: user._id,
               email: user.email,
               date: user.date,
            },
         })
      }
   )
}
