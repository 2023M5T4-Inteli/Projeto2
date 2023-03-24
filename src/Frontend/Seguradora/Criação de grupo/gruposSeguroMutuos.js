// Função que dispara um pop-up de confirmação para criar um novo grupo
function confirmCreation() {
  Swal.fire({
  title: 'Criar novo grupo?',
  text: 'Verifique se as informações para criação de um novo grupo mútuo estão corretas, uma vez feito, não poderá ser alterado.',
  showCancelButton: true,
  confirmButtonText: 'Criar Grupo',
  cancelButtonText: 'Cancelar'
  }).then((result) => {
  if (result.isConfirmed) {
  // Pop-up de confirmação de sucesso ao criar o novo grupo
  Swal.fire({
  title: 'Concluído!',
  text: 'Um novo grupo foi criado com sucesso!',
  icon: 'success'
  }).then((result) => {
  if (result.isConfirmed) {
  window.location.href = './visualizacaoGrupo.html';
  }
  })
  }
  });
  }
  
  // Função que redireciona para a página de visualização de seguros
function voltarVisualizarSeguros(){
  window.location.href = "./visualizacaoGrupo.html"
  }
  
  // Função que redireciona para a página do dashboard do administrador
 function voltarDashboard(){
  window.location.href = "../Dashboard/dashboardAdm.html"
  }
  
  // Event listener para redirecionar para a página de criação de um novo grupo de seguro mútuo
document.getElementById('criarGrupo').addEventListener('click', async () => {
  window.location.href = './gruposSeguroMutuos.html';
  });