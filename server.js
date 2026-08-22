const express = require('express');
const cors = require('cors');
require('dotenv').config();

const casosRoutes = require('./src/routes/casos.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota de teste rápido
app.get('/health', (req, res) => {
  res.json({ status: 'API rodando com sucesso!' });
});

// Rotas principais
app.use('/casos', casosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});