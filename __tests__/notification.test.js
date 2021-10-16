const request = require('supertest');
const app = require('../app');
const {MongoClient} = require('mongodb');

var token = null;

beforeAll(() => {
    request(app).post('/users/authenticate').send({ 
        username: "admin", 
        password: "admin"
    })
    .then(response => {
        token = response.body.token; 
        done();
    });
  });

describe("POST /notification", () => {

    it('check token', function(done) {
        request(app)
          .get('/user')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
    });

    it('respond with 200, message', function(done) {
        request(app)
        .post('/notification')
        .send({title: 'Title', message: 'Message'})
        .set('Authorization', 'Bearer ' + token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done(err);
            return done();
        });
    });
});

describe("GET /notification", () => {
    it('check token', function(done) {
        request(app)
          .get('/user')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
    });

    it('get notifications', function(done) {
        request(app)
          .get('/notification')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200, done);
    });
});

describe("PUT /notification", () => {
    it('check token', function(done) {
        request(app)
          .get('/user')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
    });

    it('get notifications', function(done) {
        request(app)
          .put('/notification')
          .set('Authorization', 'Bearer ' + token)
          .send({read: true})
          .expect('Content-Type', /json/)
          .expect(200, done);
    });
});

describe("DELETE /notification", () => {
    it('check token', function(done) {
        request(app)
          .get('/user')
          .set('Authorization', 'Bearer ' + token)
          .expect(200, done);
    });

    var notificationID = 0;

    it('get notifications', function(done) {
        request(app)
          .get('/notification')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200, done);
    });

    it('delete notification `$notificationID`', function(done) {
        request(app)
          .delete('/notification/')
          .set('Authorization', 'Bearer ' + token)
          .expect('Content-Type', /json/)
          .expect(200, done);
    });
});