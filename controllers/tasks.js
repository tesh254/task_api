const express = require("express");
const db = require("../database/models");

const api = express.Router();

api.get("/all", async (req, res, next) => {
  // Pagination Logic
  let page = parseInt(req.query.page, 10);
  let size = parseInt(req.query.limit, 10);
  let order = req.query.order;
  let orderMethod = req.query.orderMethod;

  if (page <= 0 || !page) {
    page = 1;
  }
  if (size > 5) {
    size = 5;
  }

  const tasks = await db.Task.findAll({
    order: [[order, orderMethod]],
    limit: size,
    offset: size * page
  });

  if (tasks.length === 0) {
    res.status(200).json({
      page: 1,
      perPage: 5,
      totalTasks: 0,
      tasks: []
    });
  }

  res.status(200).json({
    tasks
  });
});

module.exports = api;
