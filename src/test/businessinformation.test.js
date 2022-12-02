let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require('../../app')
const sinon = require('sinon')
const { pool } = require("../config/server");
const { buildCheckFunction } = require('express-validator');
chai.should()

chai.use(chaiHttp);

let dropTable = () => {
  require('../models/drop')
}
const businessInfo = {
  id: "ee93dad2-ce73-4b9e-908c-65804cbcb62b",
  name: "Olu",
  location: "Lekki",
  cacNo: "2189342",
  website: "naoobblanka.com",
  taxNo: "202105",
  email: "zemikimeo@example3.com",
  phone:'09127941358',
} 
const stub = sinon.stub(pool, "query")
let testId = businessInfo.id

describe('/POST businessinformation', () => { 
  it('it should CREATE a businessinformation with field', (done) => {
  stub.withArgs('INSERT INTO tbl_kp_business_info (id, name,location, "cacNo", website, "taxNo", email, phone) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
  [businessInfo.id, businessInfo.name, businessInfo.location, businessInfo.cacNo, businessInfo.website, businessInfo.taxNo, businessInfo.email, businessInfo.phone]).returns(businessInfo);
    chai.request(app)
    .post('/api/v1/add-business-details')
    .set({"Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRkOTJlNC01MDk1LTQ3ZWYtYTkxYS0yMTZlY2VjMTRiNjIiLCJpYXQiOjE2Njk4MTg1NTYsImV4cCI6MTY2OTkwNDk1Nn0.fSR_dDMOmrqM3tRC9EM6vZFwr8CqgKZVZE6ZljLLfGI'})
    .send(businessInfo)
    .end((err, res) => {
        res.should.have.status(201)
        console.log(err)
        res.body.should.be.a('object')
        res.body.should.have.property('status')
        res.body.should.have.property('message')
        res.body.message.should.be.a('string')
      done();
    }); 
  });
 });
 
 describe('/GET businessinformation', () => { 
 it('should GET ALL BusinessDetails',(done) =>{
  stub.withArgs('SELECT * FROM tbl_kp_business_info ORDER BY "name" ASC').returns(businessInfo);
  chai.request(app)
    .get('/api/v1/business-information')
    .set({"Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRkOTJlNC01MDk1LTQ3ZWYtYTkxYS0yMTZlY2VjMTRiNjIiLCJpYXQiOjE2Njk4MTg1NTYsImV4cCI6MTY2OTkwNDk1Nn0.fSR_dDMOmrqM3tRC9EM6vZFwr8CqgKZVZE6ZljLLfGI'})
    .end((err, res) =>{
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    })
  });
})


it('should GET businessDetailsById',(done) =>{
  stub.withArgs('SELECT * FROM tbl_kp_business_info WHERE id = $1', [testId]).returns(businessInfo);

    chai.request(app)
      .get(`/api/v1/business-details-id?id=${testId}`)
      .set({"Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRkOTJlNC01MDk1LTQ3ZWYtYTkxYS0yMTZlY2VjMTRiNjIiLCJpYXQiOjE2Njk4MTg1NTYsImV4cCI6MTY2OTkwNDk1Nn0.fSR_dDMOmrqM3tRC9EM6vZFwr8CqgKZVZE6ZljLLfGI'})
      .end((err, res)=> {
        console.log(res.body)
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
    })
  

    describe('/PUT updateBusinesssDetailsById', () => {
      it('should update a Business Details by Id',(done) =>{
        chai.request(app)
          .put('/api/v1/update-business-details/'+testId)
          .set({"Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRkOTJlNC01MDk1LTQ3ZWYtYTkxYS0yMTZlY2VjMTRiNjIiLCJpYXQiOjE2Njk4MTg1NTYsImV4cCI6MTY2OTkwNDk1Nn0.fSR_dDMOmrqM3tRC9EM6vZFwr8CqgKZVZE6ZljLLfGI'})
          .send({'name': 'Spider'})
          .end((err, res)=>{
            res.should.have.status(204);
            res.body.should.be.a('object');
            done();
          });
      });
    });