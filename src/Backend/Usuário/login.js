const cors = require('cors');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static("../../Frontend/"));

app.post('/login', (req, res) => {
    const email = req.body.email;
    console.log(email)
    const query = `SELECT * FROM CooverUsuarios WHERE Email = ?`; // Change the placeholder to '?'

    db.get(query, [email], (err, row) => {
      if (err) {
        res.status(500).send(err.message);
        console.log(err.message);
      } else if (row) {
        res.status(200).json({ mensagem: 'Usuário encontrado.' });
      } else {
        res.status(404).json({ mensagem: 'Usuário não encontrado.' });
      }
    });
});
app.get('/dados', (req, res) => {
  const query = `SELECT * FROM CooverDadosUsuarios`; // Change the placeholder to '?'

  db.get(query, (err, row) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else if (row) {
      return res.status(200).json({ mensagem: 'Usuário encontrado.', row });

    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
  });
});







app.post('/indenizacao', (req, res) => {
  console.log('Recebido');
  const grupo = req.body.grupo;
  const data = req.body.data;
  const motivo = req.body.motivo;

  const query = `INSERT INTO CooverDadosUsuarios (grupo1, data, motivo) VALUES (?, ?, ?);`; // Use placeholders instead of interpolating values directly into the string

  db.run(query, [grupo, data, motivo], function(err) {
    if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else {
      res.status(200).json({ mensagem: 'cadastrado' });
    }
  });
});


const db = new sqlite3.Database('../BancoDeDadosCoover.db');

const PORT = 3081;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});