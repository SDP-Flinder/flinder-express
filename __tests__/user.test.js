const request = require('supertest');
const app = require('../app');

// beforeAll(done => {
//     done()
//   })
  
//   afterAll(done => {
//     // Closing the DB connection allows Jest to exit successfully.
//     mongoose.connection.close()
//     done()
//   })

describe("POST /users", () => {

    describe("Given a correct username and password", () => {

        test("Response should have statusCode 200", done => {
            request(app).post("/users/authenticate").send({
                username: 'admin',
                password: 'admin'
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        test("Response content-type should be json", done => {
            request(app).post("/users/authenticate").send({
                username: 'admin',
                password: 'admin'
            })
            .then(response => {
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
                done();
            });
        });

        test("Response should contain user's id", done => {
            request(app).post("/users/authenticate").send({
                username: 'admin',
                password: 'admin'
            })
            .then(response => {
                expect(response.body.id).toBeDefined();
                done();
            });
        });

        test("Response should contain user's username", done => {
            request(app).post("/users/authenticate").send({
                username: 'admin',
                password: 'admin'
            })
            .then(response => {
                expect(response.body.username).toBeDefined();
                done();
            });
        });

        test("Response should contain user's firstName", done => {
            request(app).post("/users/authenticate").send({
                username: 'admin',
                password: 'admin'
            })
            .then(response => {
                expect(response.body.firstName).toBeDefined();
                done();
            });
        });

        test("Response should contain user's lastName", done => {
            request(app).post("/users/authenticate").send({
                username: 'admin',
                password: 'admin'
            })
            .then(response => {
                expect(response.body.lastName).toBeDefined();
                done();
            });
        });

        test("Response should contain a token", done => {
            request(app).post("/users/authenticate").send({
                username: 'admin',
                password: 'admin'
            })
            .then(response => {
                expect(response.body.token).toBeDefined();
                done();
            });
        }); 
    });


    describe("Given an incorrect username and password", () => {

        test("Response should have statusCode 400", done => {
            request(app).post("/users/authenticate").send({
                username: 'incorrect',
                password: 'incorrect'
            })
            .then(response => {
                expect(response.statusCode).toBe(400);
                done();
            });
        });

        test("Response should have message 'incorrect-username-password'", done => {
            request(app).post("/users/authenticate").send({
                username: 'incorrect',
                password: 'incorrect'
            })
            .then(response => {
                expect(response.body.message).toEqual('incorrect-username-password');
                done();
            });
        });
    });

    done();
  });