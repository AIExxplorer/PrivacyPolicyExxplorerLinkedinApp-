const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

// Rota principal
app.get('/', (req, res) => {
    res.send('Servidor Local Rodando');
});

// Rota para tratar a callback do LinkedIn
app.get('/auth/linkedin/callback', (req, res) => {
    // Aqui você vai capturar o código de autorização que o LinkedIn envia
    const code = req.query.code;

    if (!code) {
        res.status(400).send('Erro: código de autorização não encontrado');
        return;
    }

    // Mensagem temporária de sucesso
    res.send(`Código de autorização recebido: ${code}`);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
