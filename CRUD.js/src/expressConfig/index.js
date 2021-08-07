const express = require('express');
const useRoutes = require('../api/routes/user')

module.exports = () => {
  const app = express();

  app.use(express.json());
  app.use("/api/v1/users", useRoutes);

  return app;
}