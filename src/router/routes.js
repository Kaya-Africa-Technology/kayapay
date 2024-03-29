const express = require('express')
const router = express.Router()

router.use(process.env.BASE_URL, [
  require('./endpoints/auth'),
  require('./endpoints/client'),
  require('./endpoints/products'),
  require('./endpoints/loadingsite'),
  require('./endpoints/exactlocations'),
  require('./endpoints/trucktype'),
  require('./endpoints/driver'),
  require('./endpoints/orders/truckavailability'),
  require('./endpoints/orders/order'),
  require('./endpoints/orders/pendingverification'),
  require('./endpoints/orders/tripevent'),
  require('./endpoints/truck'),
  require('./endpoints/account-management/businessinformation')
])


module.exports = router