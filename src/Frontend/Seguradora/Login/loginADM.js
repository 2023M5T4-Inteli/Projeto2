// Adiciona um evento de clique no elemento com id "botaoLogin"
document.getElementById('botaoLogin').addEventListener('click', async () => {
    window.location.href = './verificacao.html';
});

// Adiciona um evento de clique no elemento com id "voltar"
document.getElementById('voltar').addEventListener('click', async () => {
    window.location.href = '../../index.html';
});

// Função que é chamada quando o usuário clica no botão "Voltar"
function voltarInicioPlataforma() {
    window.location.href = '../../index.html';
}

