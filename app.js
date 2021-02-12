// import * as http from 'http';
// import { requestHandler } from '';
const R = require('ramda');
const http = require('http');
/////////////////////////////////////////////////////////////////////

let users = [];
const counter = 0;
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (R.equals(url, '/')) {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My tasks</title></head>');
    res.write('<body><h1>Task first!</h1><form action="/create-users" method="POST"><input type="text" name="username"/><button> Add user</button></form></body>');
    res.write('</html>');

    return res.end();
  }
  if (R.equals(url, '/users')) {
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Users list</title></head>');
    users.map(el => {
      counter++;
      return res.write(`<li>User ${counter}:${el}</li>`)
    });
    res.write('</html>');
    res.end();
  }
  if (R.equals(url, '/create-users') && R.equals(method, 'POST')) {
    const body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      users.push(parseBody.split('=')[1]);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
});

server.listen(3000);

