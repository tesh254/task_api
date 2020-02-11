const chai = require("chai");
const chaiHttp = require("chai-http");
require("chai/register-should");
const app = require("../app");

chai.use(chaiHttp);

const { expect } = chai;

describe("Testing login endpoint", () => {
  it("should login successfully", done => {
    chai
      .request(app)
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({
        phonenumber: "0705181707",
        password: "test254"
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it("should login unsuccessfully if user does not exist", done => {
    chai
      .request(app)
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({
        phonenumber: "0705181709",
        password: "test254"
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  it("should login unsuccessfully due to null body", done => {
    chai
      .request(app)
      .post("/auth/login")
      .set("Content-Type", "application/json")
    //   .send({})
      .end((err, res) => {
        expect(res.status).to.equal(500);
        done();
      });
  });

  it("should login unsuccessfully due to wrong password", done => {
    chai
      .request(app)
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({phonenumber: "0705181707", password: "test25"})
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.message).to.equal("Wrong password")
        done();
      });
  });
});
