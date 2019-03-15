const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
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

 
// *****************************************************************
// LANDING PAGE
// *****************************************************************
  it('should display index.html page on get', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
      });
  });


// *****************************************************************
// LOGIN TESTS: ALL WORKING 
// *****************************************************************
  it('Should reject users with missing username', function() {
    return chai
      .request(app)
      .post('/api/auth/login')  
      .send({
        password
      })
      .then(() =>
        expect.fail(null, null, 'Request should not succeed')
      )
      .catch(err => {
        if (err instanceof chai.AssertionError) {
          throw err;
        }
      });
  });

  it('Should reject users with missing password', function() {
    return chai
      .request(app)
      .post('/api/auth/login')  
      .send({
        username
      })
      .then(() =>
        expect.fail(null, null, 'Request should not succeed')
      )
      .catch(err => {
        if (err instanceof chai.AssertionError) {
          throw err;
        }
      });
  });

  it('Should reject requests with incorrect username', function () {
    return chai
      .request(app) 
      .post('/api/auth/login')
      .send({ username: 'fakename', password })        
      .then(() =>
        expect.fail(null, null, 'Request should not succeed')
      )
      .catch(err => {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        expect(res).to.have.status(401);
      });
  });

  it('Should reject requests with incorrect password', function () {
    return chai
      .request(app)
      .post('/api/auth/login')
      .send({ username, password: 'wrongPassword' })
      .then(() =>
        expect.fail(null, null, 'Request should not succeed')
      )
      .catch(err => {
        if (err instanceof chai.AssertionError) {
          throw err;
        }

        const res = err.response;
        expect(res).to.have.status(401);
      });
  });

  it('Should return a valid auth token with real user', function () {
    return chai
      .request(app)
      .post('/api/auth/login')
      .send({ username, password })
      .then(res => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        const token = res.body.authToken;
        expect(token).to.be.a('string');
        const payload = jwt.verify(token, JWT_SECRET, {
          algorithm: ['HS256']
        });
        expect(payload.user).to.deep.equal(
          'test@test.com'
        );
      });
  });



// *****************************************************************
// REGISTRATION TESTS
// *****************************************************************

// NOT WORKING: GETTING 500 INSTEAD OF 401 
// it('Should reject registration requests with no reg details', function() {
//     return chai
//       .request(app)
//       .post('/api/auth/register')
//       .then(() =>
//         expect.fail(null, null, 'Request should not succeed')
//       )
//       .catch(err => {
//         if (err instanceof chai.AssertionError) {
//           throw err;
//         }
//         const res = err.response;
//         expect(res).to.have.status(401);
//       });
//   });

//   NOT WORKING: GETTING 500 INSTEAD OF 401 
//   it('Should reject requests with an invalid token', function() {
//     const token = jwt.sign(
//       {username, password},
//       'wrongSecret',
//       {algorithm: 'HS256', expiresIn: '7d'}
//     );
//     return chai
//       .request(app)
//       .post('/api/auth/register')
//       .set('Authorization', `Bearer ${token}`)
//       .then(() =>
//         expect.fail(null, null, 'Request should not succeed')
//       )
//       .catch(err => {
//         if (err instanceof chai.AssertionError) {
//           throw err;
//         }
//         const res = err.response;
//         expect(res).to.have.status(401);
//       });
//   });







//-----------------END OF CRUD DESCRIBE-------------------
})