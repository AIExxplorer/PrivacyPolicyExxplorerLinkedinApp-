require('dotenv').config();
const axios = require('axios');

// Variáveis de ambiente
const clientId = process.env.LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

// Função para pegar o access token do LinkedIn
async function getAccessToken(code) {
    try {
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Erro ao obter o access token:', error.response ? error.response.data : error.message);
        return null;
    }
}

// Função para pegar as últimas atividades no LinkedIn
async function getLinkedInActivity(accessToken) {
    try {
        const response = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter atividades do LinkedIn:', error.response ? error.response.data : error.message);
        return null;
    }
}

// Função para enviar a notificação ao Discord
async function sendDiscordNotification(message) {
    try {
        await axios.post(webhookUrl, {
            content: message,
        });
        console.log('Notificação enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar notificação para o Discord:', error.response ? error.response.data : error.message);
    }
}

// Função principal
async function main() {
    // Insira o código de autorização que você obteve manualmente
    const authorizationCode = 'AQTlK9piCqni7Ik0Sv1xnEwf8fUTFsHpOM2iekTI8nDersQRnyBHlSh4qj7qFbtcUS7PXZibC5TqBnGuAP9KHLOGRqhevdzeHLVM40KaWZgeFh5nUXfIAsAzJbF6za0vMFB-XQarS2zgx2mp6PQ0-ixE3v4Tcw3PDDEa7yr6pGy1LAXh8y2IwxvUjTKc5rs8dAOwkrtbGkz1ewVMWnA';

    // Obtenha o access token
    const accessToken = await getAccessToken(authorizationCode);
    if (!accessToken) return;

    // Obtenha a atividade do LinkedIn
    const linkedInActivity = await getLinkedInActivity(accessToken);
    if (!linkedInActivity) return;

    // Envie a notificação para o Discord
    const message = `Atividade no LinkedIn de ${linkedInActivity.localizedFirstName} ${linkedInActivity.localizedLastName}`;
    await sendDiscordNotification(message);
}

// Executa a função principal
main();
