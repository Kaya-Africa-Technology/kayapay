// const { pool } = require("../config/server");
require("dotenv").config();
const { validationResult } = require("express-validator");
// const response = require("../handlers/response");

class businessInformationController {
  static async businessDetails(req, res, next) {
    console.log("We are here`")
  }


}

module.exports = businessInformationController;
