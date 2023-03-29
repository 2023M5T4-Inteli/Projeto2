const cors = require('cors');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.static("../../Frontend/"));

const db = new sqlite3.Database('../BancoDeDadosCoover.db');

// Rota para obter a quantidade de membros do grupo
app.post('/escolhaGrupoInicio', (req, res) => {
  const grupo = req.query.grupoEscolhido;
  const imei = req.query.imei;

  const sql = 'INSERT INTO CooverGruposUsuarios (grupo, imei) VALUES (?,?)';

  db.run(sql, [grupo, imei], function(err) {
    if (err) {
      console.log(err.message);
      res.status(500).send('Erro ao inserir os dados.');
    } else {
      console.log(`Dados inseridos com sucesso. ID da linha: ${this.lastID}`);
      res.status(200).send('Dados inseridos com sucesso.');
    }
  });
});

const PORT = 3092;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

