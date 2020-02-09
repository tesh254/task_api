const express = require("express");
const faker = require("faker");
const random = require("lodash.random");
const times = require("lodash.times");
const bodyParser = require("body-parser");
const db = require("./database/models");
const passwordHelpers = require("./helpers/bcrypt");
const dataHelpers = require("./helpers/date");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// Set port
app.set("port", process.env.PORT || 4567);

// Generate dummy data
db.sequelize.sync().then(() => {
  // Clear tables
  db.User.destroy({ where: {}, truncate: true });
  db.Task.destroy({ where: {}, truncate: true });
  // add data to User tale
  db.User.bulkCreate(
    times(5, () => ({
      name: faker.name.firstName(),
      phonenumber: `07${random(1, 99999999)}`,
      password: passwordHelpers.generatePasswordHash(faker.lorem.text(6))
    }))
  );

  db.User.create({
    name: "test name",
    phonenumber: "0705181707",
    password: passwordHelpers.generatePasswordHash("test254")
  });

  const status = ["Completed", "Deferred", "InProgress"];
  const gender = ["Male", "Female"];

  // Generate tasks records
  db.Task.bulkCreate(
    times(10, () => ({
      task_id: random(1000, 9999),
      customer_first_name: faker.name.firstName(),
      personnel_first_name: faker.name.firstName(),
      customer_last_name: faker.name.lastName(),
      customer_phone: `07${random(1, 99999999)}`,
      agentId: random(1000, 9999),
      assigned: dataHelpers.formatDate(new Date()),
      in_progress: dataHelpers.formatDate(new Date()),
      completed: dataHelpers.formatDate(new Date()),
      deferred: dataHelpers.formatDate(new Date()),
      status: status[random(0, 2)],
      location: faker.address.state(),
      gender: gender[random(0, 1)],
      age: random(18, 65),
      access_code: random(1, 10),
      splash_page: random(1, 10),
      mpesa: random(1, 10),
      autoplay: random(1, 10),
      comments: "some comment",
      registration: "Self"
    }))
  );
  app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });
});

module.exports = app;
