const express = require('express')
const businessInfoRoute = express.Router()
const middleware = require('../../../middlewares/middleware')
const businessInformationController = require('../../../controllers/account-management/businessinformationController')

businessInfoRoute.get(
  '/business-information',
//   middleware.VERIFY_TOKEN,
  businessInformationController.businessDetails
)

module.exports = businessInfoRoute