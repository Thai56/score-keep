const express = require('express');
const mysql = require('mysql2');
const config = require('./config/config');
const testData = require('./data');

const { serverConfig, localConfig } = config;

const conn = new mysql.createConnection(serverConfig);

conn.connect((err) => {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
    queryDatabase();
  }
});

function recordScore(req, res) {
  const { name, score } = req.params;
  const sql = 'INSERT INTO contestants (name, score) VALUES (?, ?);';

  conn.query(sql, [name, score], function(err, result, fields) {
    if (err) res.status(404).send(err);

    res.status(201).send(JSON.stringify(result));
  });
}

function queryTop25(req, res) {
  const sql = 'SELECT * FROM contestants ORDER BY score DESC LIMIT 25';

  conn.query(sql, (err, result) => {
    if (err) res.status(404).send(err);

    res.status(200).send(JSON.stringify(result));
  });
}

function deleteScore(req, res) {
  const { name } = req.params;
  const sql = `DELETE FROM contestants WHERE name = \'${name}\';`;

  conn.query(sql, (err, result) => {
    if (err) res.status(404).send(err);

    res.status(201).send(result);
  })
}

function queryDatabase() {
  conn.query('DROP TABLE IF EXISTS contestants;', (err) => {
    if (err) throw err;
  })

  conn.query('CREATE TABLE contestants (id serial PRIMARY KEY, name VARCHAR(50), score INTEGER);', (err) =>  {
    if (err) throw err;
  });

  conn.query('INSERT INTO contestants (name, score) VALUES ?;', [testData], (err) => {
      if (err) throw err;
  });
}

const app = express();

app.get('/top-contestants', queryTop25);

app.post('/contestants/:name/:score', recordScore);

app.delete('/contestants/:name', deleteScore);

app.listen(localConfig.port, () => {
  console.log('now listening on port ', localConfig.port);
});
