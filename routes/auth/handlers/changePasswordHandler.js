const sendResponse = require('../../../utils/sendResponse')
const sendError = require('../../../utils/sendError')
const { SUCCESS } = require('../../../utils/statusCodes')
const validateRequest = require('../helpers/validateRequest')
const comparePassword = require('../helpers/comparePasswords')
const encryptPassword = require('../helpers/encryptPassword')
const User = require('../../../models/user')

module.exports = async (req, res) => {
   try {
      validateRequest(req)
      let { oldPassword, password } = req.body

      const user = await User.findById(req.user._id)

      // Compare passwords
      await comparePassword(oldPassword, user, 'Old password does not match!')

      // Encrypt password
      password = await encryptPassword(password)

      user.password = password
      await user.save()

      sendResponse(res, SUCCESS, 'Password has been changed successfully!')
   } catch (err) {
      sendError(res, err)
   }
}
