const request = require('supertest');
const app = require('../app');
const {MongoClient} = require('mongodb');
let token;
let userID;

beforeAll((done) => {
    request(app)
    .post('/users/authenticate')
    .send({
        username: 'admin',
        password: 'admin',
    })
    .end((err, response) => {
        token = response.body.token; // save the token!
        userID = response.body.id;
        done();
    });
});

describe("POST /users", () => {
    describe("Given a correct username and password", () => {
        test("Response should have statusCode 200", done => {
            request(app).post("/users/authenticate").send({
                username: 'admin',
                password: 'admin'
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
                expect(response.body.id).toBeDefined();
                expect(response.body.username).toBeDefined();
                expect(response.body.firstName).toBeDefined();
                expect(response.body.lastName).toBeDefined();
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
                expect(response.body.message).toEqual('incorrect-username-password');
                done();
            });
        });
    });

});

describe("PUT /users", () => {
    test('change notification preference to false', () => {
        return request(app)
            .put(`/users/${userID}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                receiveNotifications: false,
            })
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(response.body.receiveNotifications).toBe(false);
            });
    });

    test('change notification preference to true', () => {
        return request(app)
        .put(`/users/${userID}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            receiveNotifications: true,
        })
        .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body.receiveNotifications).toBe(true);
        });
    });
});


// >>> Keep me around <<<
// describe('MongoDB insert user', () => {
//     let connection;
//     let db;
  
//     beforeAll(async () => {
//       connection = await MongoClient.connect(global.__MONGO_URI__, {
//         useNewUrlParser: true,
//       });
//       db = await connection.db(global.__MONGO_DB_NAME__);
//     });
  
//     afterAll(async () => {
//       await connection.close();
//       await db.close();
//     });
  
//     it('should insert a document into collection', async () => {
//       const users = db.collection('users');
  
//       const mockUser = {_id: 'some-user-id', name: 'John'};
//       await users.insertOne(mockUser);
  
//       const insertedUser = await users.findOne({_id: 'some-user-id'});
//       expect(insertedUser).toEqual(mockUser);
//     });
//   });