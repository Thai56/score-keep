const express = require('express');
const mysql = require('mysql2');
const { serverConfig, LOCAL_PORT } = require('../config/config');
const testData = require('../data');

// eslint-disable-next-line
const conn = new mysql.createConnection(serverConfig);

function setupDB() {
  conn.query('DROP TABLE IF EXISTS contestants;', (err) => {
    if (err) throw err;
  });

  conn.query(
    'CREATE TABLE contestants (id serial PRIMARY KEY, name VARCHAR(50), score INTEGER);', (err) => {
      if (err) throw err;
    },
  );

  conn.query('INSERT INTO contestants (name, score) VALUES ?;', [testData], (err) => {
    if (err) throw err;
  });
}

function getAllContestants(req, res) {
  conn.query('SELECT * FROM contestants', (err, result) => {
    if (err) res.status(404).send(err);

    res.status(200).send(result);
  });
}

function getTopContestants(req, res) {
  const sql = 'SELECT * FROM contestants ORDER BY score DESC LIMIT 25';

  conn.query(sql, (err, result) => {
    if (err) res.status(404).send(err);

    res.status(200).send(result);
  });
}

function recordScore(req, res) {
  const { name, score } = req.params;
  const sql = 'INSERT INTO contestants (name, score) VALUES (?, ?);';

  conn.query(sql, [name, score], (err, result) => {
    if (err) res.status(404).send(err);

    res.status(201).send(result);
  });
}

function deleteScore(req, res) {
  const { name } = req.params;
  const sql = `DELETE FROM contestants WHERE name = '${name}';`;

  conn.query(sql, (err, result) => {
    if (err) res.status(404).send(err);

    res.status(202).send(result);
  });
}

function deleteAllContestants(req, res) {
  conn.query('TRUNCATE TABLE contestants;', (err, result) => {
    if (err) res.status(404).send(err);

    res.status(202).send(result);
  });
}

conn.connect((err) => {
  if (err) throw err;
  else setupDB();
});

const app = express();

app.get('/contestants/', getAllContestants);

app.get('/contestants/top', getTopContestants);

app.post('/contestants/:name/:score', recordScore);

app.delete('/contestants/:name', deleteScore);

app.delete('/contestants/', deleteAllContestants);

// eslint-disable-next-line no-console
app.listen(LOCAL_PORT, () => console.log('now listening on port ', LOCAL_PORT));
