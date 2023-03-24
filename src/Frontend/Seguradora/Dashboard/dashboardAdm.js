document.getElementById('grupoSeguro').addEventListener('click', async () => {

    window.location.href = '../Criação de grupo/visualizacaoGrupo.html';

});

document.getElementById('indenizacoes').addEventListener('click', async () => {

    window.location.href = '../Aceite de indenização/aceiteIndenizacao.html';

});

document.getElementById('usuario').addEventListener('click', async () => {

    window.location.href = '../Usuários/visualizacaoUsuario.html';

});

document.getElementById('seguroMutuo').addEventListener('click', async () => {

    window.location.href = '../Seguros Mútuos/segurosMutuosVisualizacao.html';

});

function sairPlataforma(){
    window.location = "../../index.html";
}