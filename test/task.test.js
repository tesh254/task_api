const chai = require("chai");
const chaiHttp = require("chai-http");
require("chai/register-should");
const jwt = require("jsonwebtoken");
const env = require("../env");
const app = require("../app");

chai.use(chaiHttp);

const { expect } = chai;

describe("Testing task endpoint", () => {
  it("should fail to fetch all task without login", done => {
    chai
      .request(app)
      .get("/tasks/all?page=1&limit=5&order=createdAt&orderMethod=DESC")
      .set("Content-Type", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it("should fetch all task after login", done => {
    const newToken = jwt.sign("0705181707", env.secretKey);

    chai
      .request(app)
      .get("/tasks/all?page=1&limit=5&order=createdAt&orderMethod=DESC")
      .set("Authorization", `Bearer ${newToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("should fetch all task with a page number less that 0", done => {
    const newToken = jwt.sign("0705181707", env.secretKey);

    chai
      .request(app)
      .get("/tasks/all?page=-1&limit=5&order=createdAt&orderMethod=DESC")
      .set("Authorization", `Bearer ${newToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("should fetch all task with a page number limit above 5 or less that 0", done => {
    const newToken = jwt.sign("0705181707", env.secretKey);

    chai
      .request(app)
      .get("/tasks/all?page=-1&limit=6&order=createdAt&orderMethod=DESC")
      .set("Authorization", `Bearer ${newToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
