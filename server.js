const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
// Rota principal
app.get('/', (req, res) => {
    res.send('Servidor Local Rodando');
});

// Rota para tratar a callback do LinkedIn
app.get('/auth/linkedin/callback', (req, res) => {
    const code = req.query.code;

    if (!code) {
        res.status(400).send('Erro: código de autorização não encontrado');
        return;
    }

    res.send(`Código de autorização recebido: ${code}`);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
