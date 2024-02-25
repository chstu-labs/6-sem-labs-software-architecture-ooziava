const app = require("./server");
const supertest = require("supertest");
const request = supertest(app);

const message = process.env.MESSAGE || "Hello World!";

it("Root return env message", function (done) {
  request.get("/").expect(message).end(done);
});

it("Test return object with message prop", function (done) {
  request.get("/test").expect({ message }).end(done);
});
