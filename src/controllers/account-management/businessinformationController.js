const { pool } = require("../../config/server");
require("dotenv").config();
const response = require("../../handlers/response");

class businessInformationController {
  static async getBusinessDetails(_req, res) {
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
      const {id} = req.params;
      const businessDetailsId = parseInt(req.params.businessDetailsId)
      pool.query('SELECT * FROM tbl_kp_business_info WHERE id = $1', [id])
      response.success(
        res, 200, 'businessDetailsId', businessDetailsId
      )
    }
    catch (err) {
      response.error(
        res, 500, 'internal server error', err.message
      )
      console.log(err)
    }
  }

  static async addBusinessDetails(req, res) {
    try {
      const {
        name,
        location,
        cacNo,
        website,
        taxNo,
        email,
        phone
      } = req.body
      await pool.query('INSERT INTO tbl_kp_business_info (name,location, "cacNo", website, "taxNo", email, phone) VALUES($1, $2, $3, $4, $5, $6, $7);',
        [name, location, cacNo, website, taxNo, email, phone])

      const info = await pool.query(`SELECT * FROM tbl_kp_business_info WHERE "email"='${email}';`);
      response.success(
        res, 201, 'added business details', info
      )
    }
    catch (err) {
      console.log(err)
      
      response.error(
        res, 500, 'internal error', err.message
      )
    }
  }

  static async updateBusinessDetails(req, res) {
    try {
      const id = req.params.id
      const {
        location,
        phone,
      } = req.body
      pool.query(
        'UPDATE tbl_kp_business_info SET location = $1, phone = $2 WHERE id = $3',
        [location, phone, id])
      response.success(
        res, 204, 'updated business info', { id: id }
      )
    }
    catch (err) {
      response.error(
        res, 500, 'internal server error', err.message
      )
    }
  }


  static async suspendBusiness(req, res, next) {
    const businessId = req.params.businessId;
    try {
      const patchBusinessQuery =
        'UPDATE tbl_kp_clients SET "businessStatus" = $1 RETURNING id, "name", "business"';
      const businessSuspension = await pool.query(patchBusinessQuery, [0]);
      response.success(
        res,
        200,
        "suspension activated",
        businessSuspension.rows[0]
      );
    } catch (err) {
      response.error(res, 500, "internal server error", err.message);
    }
  }
}
module.exports = businessInformationController;