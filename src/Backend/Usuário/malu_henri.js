const cors = require('cors');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static("../../../Frontend/"));

const db = new sqlite3.Database('../../BancoDeDadosCoover.db');

app.post('/dadosPessoais', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const modelo = req.body.modelo;
    const valor = req.body.valor;

    const sql = 'INSERT INTO CooverDadosUsuarios (nome, email, modelo, valor) VALUES (?, ?, ?, ?)';
    db.run(sql, [nome, email, modelo, valor], function(err) {
      if (err) {
        console.log(err.message);
        res.status(500).send('Erro ao inserir os dados.');
      } else {
        console.log(`Dados inseridos com sucesso. ID da linha: ${this.lastID}`);
        res.status(200).send('Dados inseridos com sucesso.');
      }
    });
});

const PORT = 3091;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
