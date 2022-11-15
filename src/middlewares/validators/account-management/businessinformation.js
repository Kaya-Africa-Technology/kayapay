const { body, check } = require("express-validator");
const { pool } = require("../../../config/server");

exports.BUSINESS_INFO = [
  check("businessDetailsId")
    .isString()
    .trim()
    .custom(async (value, { req }) => {
      const businessDetailsId = await pool.query(
        "SELECT * FROM tbl_kp_business_info WHERE id = $1",
        [value]
      );
      req.businessDetailsId = businessDetailsId.rows[0];
    }),
];


exports.NEW_BUSINESS = [
  body('name')
    .isString()
    .trim()
    .toLowerCase()
    .notEmpty(),
  body('location')
    .isString()
    .trim()
    .toLowerCase()
    .notEmpty(),
    body("cac_no")
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase()
    .custom(async (value, { _ }) => {
      const checkValidity = await pool.query(
        'SELECT * FROM tbl_kp_business_info WHERE "cac_no" = $1',
        [value]
      );
      if (checkValidity.rowCount > 0) {
        throw new Error("record exists");
      }
    }),
 body('website')
    .notEmpty()
    .isURL()
    .trim(),
    body("tax_no")
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase()
    .custom(async (value, { _ }) => {
      const checkValidity = await pool.query(
        'SELECT * FROM tbl_kp_business_info WHERE "tax_no" = $1',
        [value]
      );
      if (checkValidity.rowCount > 0) {
        throw new Error("record exists");
      }
    }),
  body('email')
    .notEmpty()
    .isURL()
    .trim(),
body('phone')
    .isArray()
    .isLength({ min: 1 }),
];

exports.BUSINESS_UPDATE = [
  body('name')
    .isString()
    .trim()
    .toLowerCase()
    .notEmpty(),
  body('location')
    .isString()
    .trim()
    .toLowerCase()
    .notEmpty(),
    body("cac_no")
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase()
    .custom(async (value, { req }) => {
      const checkValidity = await pool.query(
        'SELECT * FROM tbl_kp_business_info WHERE "cac_no" = $1 AND id <> $3',
        [value, req.headers.businessDetailsId]
      );
      console.log(checkValidity.rowCount)
      if (checkValidity.rowCount > 0) {
        throw new Error("record exists");
      }
    }),
    body('website')
    .notEmpty()
    .isURL()
    .trim(),
    body("tax_no")
    .isString()
    .notEmpty()
    .trim()
    .toLowerCase()
    .custom(async (value, { req }) => {
      const checkValidity = await pool.query(
        'SELECT * FROM tbl_kp_business_info WHERE "tax_no" = $1 AND id <> $6',
        [value, req.headers.businessDetailsId]
      );
      console.log(checkValidity.rowCount)
      if (checkValidity.rowCount > 0) {
        throw new Error("record exists");
      }
    }),
    body('email')
    .notEmpty()
    .isURL()
    .trim(),
  body('phone')
    .isArray()
    .isLength({ min: 1 }),
  
];
