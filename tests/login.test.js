const request = require("supertest");
const app = require("../app");

describe("Test the login endpoint", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/login")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});