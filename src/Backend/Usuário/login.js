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
  console.log("GET /dados")
  const query = `SELECT * FROM CooverDadosUsuarios;`; // Change the placeholder to '?'

  db.all(query, (err, row) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else if (row) {
      console.log(row);
      return res.status(200).json({ mensagem: 'Usuário encontrado.', row });

    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
  });
});

app.put('/dadosPessoais/:id', (req, res) => {
  const id = req.params.id;
  const grupo = req.body.grupo;
  const data = req.body.data;
  const motivo = req.body.motivo;

  const query = `UPDATE CooverDadosUsuarios SET grupo1 = ?, data = ?, motivo = ? WHERE id = ?;`; // Use placeholders instead of interpolating values directly into the string

  db.run(query, [grupo, data, motivo, id], function(err) {
    if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else {
      res.status(200).json({ mensagem: 'cadastrado' });
    }
  });
});


app.get('/dadosPessoais/:id', (req, res) => {

  console.log('GET /dadosPessoais/:id');
  
  const id = req.params.id;

  const query = `SELECT * from  CooverDadosUsuarios WHERE id=${id};`; // Use placeholders instead of interpolating values directly into the string

  db.get(query, function(err, row) {
    if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else {
      console.log(row);
      return res.status(200).json({ data: row });
    }
  });
});


app.post('/dadosPessoais', (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const modeloCelular = req.body.modelo;
  const valorCelular = req.body.valor;
  const walletAddress = req.body.enderecoCarteira;
  const imei = req.body.imeiCelular;
  const grupo = req.body.grupo;

  console.log(nome, email, modeloCelular, valorCelular, walletAddress, imei, grupo)

  const sql = 'INSERT INTO CooverDadosUsuarios (nome, email, modeloCelular, valorCelular, imei, grupo, walletAddress) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.run(sql, [nome, email, modeloCelular, valorCelular, imei, grupo, walletAddress], function(err, row) {
    if (err) {
      console.log(err.message);
      res.status(500).send('Erro ao inserir os dados.');
    } else {
      console.log(`Dados inseridos com sucesso. ID da linha: ${this.lastID}`);
      return res.status(200).send({id: this.lastID});
    }
  });
});


const db = new sqlite3.Database('../BancoDeDadosCoover.db');

const PORT = 3081;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});