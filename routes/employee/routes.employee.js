const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const getEmployeesHandler = require('./handlers/getEmployeesHandler')

// Get employees
router.patch('/get-employees', auth, getEmployeesHandler)

module.exports = router
