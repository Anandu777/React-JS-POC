const sendResponse = require('../../../utils/sendResponse')
const sendError = require('../../../utils/sendError')
const { SUCCESS } = require('../../../utils/statusCodes')
const Employee = require('../../../models/employees')

module.exports = async (req, res) => {
   try {
      let { skipCount, search, filterValue } = req.body

      let totalEmployees
      let totalEmployeeCount
      let employees

      if (filterValue !== 'All') {
         if (!search || search === '' || search === undefined) {
            totalEmployees = await Employee.find({ designation: filterValue })
            totalEmployeeCount = totalEmployees.length
            employees = await Employee.find({ designation: filterValue })
               .skip(skipCount)
               .limit(5)
         } else {
            totalEmployees = await Employee.find({
               $and: [
                  { designation: filterValue },
                  {
                     $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                     ],
                  },
               ],
            })
            totalEmployeeCount = totalEmployees.length
            employees = await Employee.find({
               $and: [
                  { designation: filterValue },
                  {
                     $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } },
                     ],
                  },
               ],
            })
               .skip(skipCount)
               .limit(5)
         }
      } else {
         if (!search || search === '' || search === undefined) {
            totalEmployees = await Employee.find()
            totalEmployeeCount = totalEmployees.length
            employees = await Employee.find().skip(skipCount).limit(5)
         } else {
            totalEmployees = await Employee.find({
               $or: [
                  { name: { $regex: search, $options: 'i' } },
                  { email: { $regex: search, $options: 'i' } },
               ],
            })
            totalEmployeeCount = totalEmployees.length
            employees = await Employee.find({
               $or: [
                  { name: { $regex: search, $options: 'i' } },
                  { email: { $regex: search, $options: 'i' } },
               ],
            })
               .skip(skipCount)
               .limit(5)
         }
      }

      sendResponse(res, SUCCESS, { totalEmployeeCount, employees })
   } catch (err) {
      sendError(res, err)
   }
}
