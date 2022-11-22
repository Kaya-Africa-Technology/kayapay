require("dotenv").config()
process.env.NODE_ENV = 'test';
const port = process.env.PORT;
const base_url = process.env.BASE_URL

const { pool } = require("../src/config/server");
let BusinessInformation = require("../src/router/endpoints/account-management/businessinformation");

let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
var should = chai.should;
var expect = chai.expect

chai.use(chaiHttp);


  describe('/GET businessDetails', () => {
      it.only('it should GET all the businessDetails', (done) => {
        // chai.request()
        chai.request(`http://localhost:${port}${base_url}`)
            .get('/business-information')
            .end((_err, res) => {
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.a('object');
                  expect(res.body.data).length.to.be.greaterThan(0);
              done();
            });
      });
  });
  
  /*
  * Test the /POST route
  */
//   describe('/POST businessinformation', () => {
//       it('it should not POST a businessinformation without field', (done) => {
//           let businessinformation = {
//               name: "",
//               location: "",
//               cacNo: ""
//           }
//         chai.request(pool)
//             .post('/add-business-details')
//             .send(businessinformation)
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('errors');
//                   res.body.errors.should.have.property('pages');
//                   res.body.errors.pages.should.have.property('kind').eql('required');
//               done();
//             });
//       });

//   });
// ;