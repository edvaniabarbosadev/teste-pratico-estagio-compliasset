const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

const db = new sqlite3.Database('data.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  password TEXT
)`);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.post('/cadastro', (req, res) => {
  const { name, email, password, passconfirmation } = req.body;

  if (password !== passconfirmation) {
    return res.status(400).json({ error: 'As senhas não conferem.' });
  }

  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ocorreu um erro ao inserir o usuário no banco de dados.' });
    }

    return res.json({ message: 'Cadastro realizado com sucesso!' });
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000.');
});