// Adiciona um evento de clique no elemento com id "grupoSeguro"
document.getElementById('grupoSeguro').addEventListener('click', async () => {

    window.location.href = '../Criação de grupo/visualizacaoGrupo.html';

});

// Adiciona um evento de clique no elemento com id "indenizacoes"
document.getElementById('indenizacoes').addEventListener('click', async () => {

    window.location.href = '../Aceite de indenização/aceiteIndenizacao.html';

});

// Adiciona um evento de clique no elemento com id "usuario"
document.getElementById('usuario').addEventListener('click', async () => {

    window.location.href = '../Usuários/visualizacaoUsuario.html';

});

// Adiciona um evento de clique no elemento com id "seguroMutuo"
document.getElementById('seguroMutuo').addEventListener('click', async () => {

    window.location.href = '../Seguros Mútuos/segurosMutuosVisualizacao.html';

});

// Função que é chamada quando o usuário clica no botão "Sair"
function sairPlataforma(){
    window.location = "../../index.html";
}