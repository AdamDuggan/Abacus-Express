const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Test CRUD ENDPOINTS', function() {

    const username = 'test@test.com';
    const password = 'test';

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });
 
//   Landing page 
  it('should display index.html page on get', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });


})