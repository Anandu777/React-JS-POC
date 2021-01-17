const sendError = require('../../../utils/sendError')
const { BAD_REQUEST } = require('../../../utils/statusCodes')
const ErrorHandler = require('../../../utils/ErrorHandler')
const generateToken = require('../helpers/generateToken')
const validateRequest = require('../helpers/validateRequest')
const encryptPassword = require('../helpers/encryptPassword')
const User = require('../../../models/user')

module.exports = async (req, res) => {
   try {
      validateRequest(req)
      let { email, password } = req.body

      let user = await User.findOne({ email: email.toLowerCase() })
      if (user) {
         throw new ErrorHandler(
            { errors: [{ msg: 'User already exists!' }] },
            BAD_REQUEST
         )
      }

      // Encrypt password      
      password = await encryptPassword(password)

      user = new User({
         email: email.toLowerCase(),
         password,
      })
      await user.save()

      // Generate token and send response
      generateToken(res, user)
   } catch (err) {
      sendError(res, err)
   }
}
