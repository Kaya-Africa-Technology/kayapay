const { pool } = require("../../config/server");
require("dotenv").config();
const { validationResult } = require("express-validator");
const response = require("../../handlers/response");

class businessInformationController {
  static async getBusinessDetails(_req, res, next) {
    try {
      const businessInformation = await pool.query('SELECT * FROM tbl_kp_business_info ORDER BY "name" ASC')
      response.success(
        res, 200, 'businessInformation', businessInformation.rows
      )
  }

catch (err) {
  response.error(
    res, 500, 'internal server error', err.message

  )
  }
}

static async getbusinessDetailsById(req, res) {
  try {
    const businessDetailsId = parseInt(req.params.businessDetailsId)
    pool.query('SELECT * FROM tbl_kp_business_info WHERE id = $1', [id])
    response.success(
      res, 200, 'businessDetailsId', businessDetailsId.rows
    )
  }
  catch(err){
    response.error(
      res, 500, 'internal sercer error', err.message
    )
  }
}

static async addBusinessDetails(req, res, next) {
  try {
    const {
      name,
      location,
      cac_no,
      website,
      tax_no,
      email,
      phone
    } = req.body
    const businessInfo = await pool.query('INSERT INTO tbl_kp_business_info (name,location,cac_no,website,tax_no, email,phone) VALUES($1, $2, $3, $4, $5,$6,$7)',
    [name,location,cac_no,website,tax_no,email,phone])
    
    response.success(
      res, 201, 'added business details', req.body
    )
  }
  catch(err){
    response.error(
      res, 500, 'internal error', err.message
    )
  }
}

static async updateBusinessDetails(req, res, next){
  try{
    const id = req.params.id
    const  {
      location,
      phone,
    } = req.body
    pool.query(
        'UPDATE tbl_kp_business_info SET location = $1, phone = $2 WHERE id = $3',
        [location, phone, id]
        .response.success(
          res, 200, 'updated business info', {id: id}
        )
    )
  }
  catch(err) {
    response.error(
      res, 500, 'internal server error', err.message
  
    )
}
}

static async deleteBusinessDetails(req, res, next) {
  try{
    const id = parseInt(request.params.id)
  pool.query('DELETE FROM tbl_kp_business_info WHERE id = $1', [id])
  }
  catch(err) {
    response.error(
      res, 500, 'internal server error', err.message
  
    )
  

   }
   }

}
module.exports = businessInformationController;