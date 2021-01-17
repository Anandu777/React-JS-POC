const sendError = require('../../../utils/sendError')
const { UNAUTHORIZED } = require('../../../utils/statusCodes')
const ErrorHandler = require('../../../utils/ErrorHandler')
const generateToken = require('../helpers/generateToken')
const validateRequest = require('../helpers/validateRequest')
const comparePassword = require('../helpers/comparePasswords')
const User = require('../../../models/user')

module.exports = async (req, res) => {
   try {
      validateRequest(req)
      const { email, password } = req.body

      // See if user exists
      let user = await User.findOne({ email: email.toLowerCase() })
      if (!user) {
         throw new ErrorHandler(
            { errors: [{ msg: 'Invalid Credentials!' }] },
            UNAUTHORIZED
         )
      }

      // Compare passwords
      await comparePassword(password, user, 'Invalid Credentials!')

      // Generate token and send response
      generateToken(res, user)
   } catch (err) {
      sendError(res, err)
   }
}
