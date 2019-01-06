const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config/config.dev');
const PORT = config.VIRTUAL_BACKEND_PORT;
const {
  VIRTUAL_BACKEND_API_PREFIX: VIRTUAL_PREFIX,
  REAL_BACKEND_API_PREFIX: REAL_PREFIX,
} = config;

const API_PREFIX = VIRTUAL_PREFIX + REAL_PREFIX;

app.use(bodyParser.urlencoded({ etended: false }));
app.use(bodyParser.json());

app.get(API_PREFIX +  '/list', (req, res) => {
  const body = req.body;
  const header = req.headers;

  console.log('header', header['content-type']);
  console.log(body);

  res.json({
    items: [
      {
        id: 1234,
        name: 'sonic',
        age: 24,
      },
      {
        id: 3344,
        name: 'tails',
        age: 22,
      }
    ],
    totalCount: 2,
  });
});

app.post(API_PREFIX + '/data', (req, res) => {
  const body = req.body;
  const header = req.headers;

  console.log('header', header['content-type']);
  console.log(body);

  res.send('');
});

app.listen(PORT, () => {
  console.log('waiting unsubscribe server ' + PORT + ' start~!');
});