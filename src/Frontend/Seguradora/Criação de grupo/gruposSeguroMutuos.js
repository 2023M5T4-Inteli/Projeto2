function confirmCreation() {

    Swal.fire({
        title: 'Criar novo grupo?',
        text:   'Verifique se as informações para criação de um novo grupo mútuo estão corretas, uma vez feito, não poderá ser alterado.',
        showCancelButton: true,
        confirmButtonText: 'Criar Grupo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title:  'Concluído!',
            text: 'Um novo grupo foi criado com sucesso!', 
            icon : 'success'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = './visualizacaoGrupo.html';
            }
          })
        }
      });
}

function voltarVisualizarSeguros(){
    window.location.href = "./visualizacaoGrupo.html"
}

function voltarDashboard(){
    window.location.href = "../Dashboard/dashboardAdm.html"
}

document.getElementById('criarGrupo').addEventListener('click', async () => {
  window.location.href = './gruposSeguroMutuos.html';
});

