
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
app.get('/quantidade_membros', (req, res) => {
  const sql = 'SELECT * FROM cooverDadosUsuario WHERE grupo = ?';
  db.get(sql, [grupo], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
      console.log(err.message);
    } else {
      res.status(200).json({ quantidade: row.quantidade });
    }
  });
});
const PORT = 3081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// Adiciona um evento de clique no elemento com id "grupoSeguro"
document.getElementById('grupoSeguro').addEventListener('click', async () => {
  window.location.href = '../Criação de grupo/visualizacaoGrupo.html';
});