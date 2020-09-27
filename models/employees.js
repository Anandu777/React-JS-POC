const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
   empId: {
      type: Number,
      required: true,
      unique: true,
   },
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   gender: {
      type: String,
      minlength: 1,
      maxlength: 1,
   },
   designation: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now,
   },
})

const Employee = mongoose.model('employee', employeeSchema)

module.exports = Employee
