const chai = require("chai");
require("chai/register-should");
const passwordHelpers = require("../helpers/bcrypt");
const dateHelpers = require("../helpers/date");

const { expect } = chai;

describe("Password helpers", () => {
  it("should test password hash and compare success", done => {
    const hashedPassword = passwordHelpers.generatePasswordHash("testpassword");
    expect(passwordHelpers.comparePasswordHash(hashedPassword, "testpassword"))
      .to.be.true;
    done();
  });

  it("should test password hash and compare fail", done => {
    const hashedPassword = passwordHelpers.generatePasswordHash("testpassword");
    expect(passwordHelpers.comparePasswordHash(hashedPassword, "testpasswor"))
      .to.be.false;
    done();
  });
});

describe("Date helpers", () => {
  it("should test date formatter success", done => {
    const date = dateHelpers.formatDate("2020-02-11T07:52:57.972Z");
    const formattedDate = "2020-02-11";
    expect(date).to.equal(formattedDate);
    done();
  });

  it("should test date formatter success of day less than two", done => {
    const date = dateHelpers.formatDate("2020-12-01T07:52:57.972Z");
    const formattedDate = "2020-12-01";
    expect(date).to.equal(formattedDate);
    done();
  });
});
