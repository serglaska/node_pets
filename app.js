const express = require('express');
const app = express();
/////////////////////////////////////////////////////////////////////
app.use('/users', (req, res, next) => {
  res.send(`<h1>Here are Users list</h1>`);
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') return res.send(`<h1>Here is the  main page</h1>`);
  if (req.originalUrl !== '/users') return res.send(`<h1>404 Page not exist</h1>`);
  next();
});

app.listen(3000);