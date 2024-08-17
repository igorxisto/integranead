require('dotenv').config();
const express = require('express');
const sql = require('mssql');

const app = express();
const port = 3000;

// Configuração do banco de dados usando variáveis de ambiente
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true', // Use true para Azure
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' // Use true para servidores locais sem SSL
  }
};

// Conectar ao banco de dados
sql.connect(dbConfig).then(pool => {
  if (pool.connecting) {
    console.log('Conectando ao banco de dados...');
  }
  if (pool.connected) {
    console.log('Conectado ao banco de dados!');
  }

  app.use(express.static('public'));

  // Rota para buscar produtos
  app.get('/api/produtos', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM Produtos');
      res.json(result.recordset);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).send('Erro ao buscar produtos');
    }
  });

  // Rota raiz
  app.get('/', (req, res) => {
    res.send('Bem-vindo à aplicação de e-commerce!');
  });
}).catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});