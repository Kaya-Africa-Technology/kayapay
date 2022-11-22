const express = require('express')
const businessInfoRoute = express.Router()
const middleware = require('../../../middlewares/middleware')
const VALIDATE = require('../../../middlewares/validators/account-management/businessinformation')
const businessInformationController = require('../../../controllers/account-management/businessinformationController')

businessInfoRoute.get(
  '/business-information',
  //  middleware.VERIFY_TOKEN,
  businessInformationController.getBusinessDetails
)

businessInfoRoute.get(
  '/business-details-id',
   middleware.VERIFY_TOKEN,
  businessInformationController.getbusinessDetailsById
)

businessInfoRoute.post(
  '/add-business-details',
  VALIDATE.BUSINESS_INFO,
  businessInformationController.addBusinessDetails
)
businessInfoRoute.put(
  '/update-business-details/:id',
  //  middleware.VERIFY_TOKEN,
  VALIDATE.BUSINESS_UPDATE,
  businessInformationController.updateBusinessDetails
)

module.exports = businessInfoRoute