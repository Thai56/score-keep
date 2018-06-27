const express = require('express');
const mysql = require('mysql2');
const config = require('./config/config');
const app = express();
const PORT = 8880;

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
       console.log("Connection established.");
           queryDatabase();
    }   
});

function queryTop25() {
  conn.query('SELECT * FROM contestants LIMIT 25 ORDER BY ');
}

function queryDatabase() {
   conn.query('DROP TABLE IF EXISTS contestants;', function (err, results, fields) {
            if (err) throw err;
            console.log('Dropped contestants table if existed.');
        })
   conn.query('CREATE TABLE contestants (id serial PRIMARY KEY, name VARCHAR(50), score INTEGER);', function(err, results, fields) {
     console.log('created table ', err, results, fields);
   });
  conn.query('INSERT INTO contestants (name, score) VALUES (?, ?);', ['george', 10],
              function (err, results, fields) {
                  if (err) throw err;
              else console.log('Inserted ' + results.affectedRows + ' row(s).');
          })
  conn.query('SELECT * FROM contestants;', (err, results, fields) => {
    console.log('from contestants ', JSON.stringify(results), fields);
  })
}


app.get('/', (req, res) => {
  res.status(200).send({name: 'you made it'});
});

app.listen(PORT, () => {
  console.log('now listening on port ', PORT);
});
