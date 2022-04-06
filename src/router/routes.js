const express = require('express')
const router = express.Router()

router.use(process.env.BASE_URL, [
  require('./endpoints/auth'),
  require('./endpoints/client'),
  require('./endpoints/products'),
  require('./endpoints/loadingsite'),
  require('./endpoints/exactlocations'),
  require('./endpoints/trucktype')
])


module.exports = router