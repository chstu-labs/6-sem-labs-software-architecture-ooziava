const nock = require("nock");
const request = require("supertest")(require("./server"));

const host = process.env.HOST || "http://localhost";
const port = process.env.API_PORT || 3000;
const message = process.env.MESSAGE || "Hello World!";

describe("Remove interceptors after each test", function () {
  afterEach(() => {
    nock.cleanAll();
  });

  it("Root return response from the same api route", function (done) {
    nock(`${host}:${port}`).get("/").reply(200, message);
    request.get("/").expect(message).end(done);
  });

  it("Test return object with message prop", function (done) {
    nock(`${host}:${port}`).get("/test").reply(200, { message });
    request.get("/test").expect({ message }).end(done);
  });
});
