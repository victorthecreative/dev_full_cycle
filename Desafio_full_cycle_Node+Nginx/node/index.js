const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;

  connection.query(sql, (error) => {
    if (error) {
      console.log(error)
    }
    console.log('Tabela people criada ou já existente');
  });
}

function insertData() {
  const sql = "INSERT INTO people(name) values('Victor');"
  connection.query(sql, (error) => {
    if (error) {
      console.log(error)
    }
  });
}


app.get('/', (req, res) => {
  console.log("aqui")
  createTable()
  insertData()
  connection.query('SELECT name FROM people', (error, results) => {
    if (error) throw error;
    let names = '<ul>';
    results.forEach(row => {
      names += `<li>${row.name}</li>`;
    });
    names += '</ul>';
    res.send(`<h1>Full Cycle Rocks!</h1>
      <h2>Nomes:</h2>
      ${names}
    `)
  })
})


app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})