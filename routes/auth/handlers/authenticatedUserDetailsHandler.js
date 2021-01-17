const sendResponse = require('../../../utils/sendResponse')
const sendError = require('../../../utils/sendError')
const { SUCCESS } = require('../../../utils/statusCodes')
const User = require('../../../models/user')

module.exports = async (req, res) => {
   try {
      const user = await User.findById(req.user._id).select(['-password'])
      sendResponse(res, SUCCESS, user)
   } catch (err) {
      sendError(res, err)
   }
}
