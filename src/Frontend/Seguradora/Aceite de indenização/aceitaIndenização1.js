// Função para exibir modal de recusa de indenização
function recusaIndenizacao() {
  Swal.fire({
    title: 'Recusa de Indenização',
    text: 'Qual o motivo da recusa da indenização?', 
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
  }).then((result) => {
// Se o botão confirmar foi clicado, exibe mensagem de sucesso e redireciona para a página de aceite de indenização
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Recusa de Indenização',
        text: 'Recusa de indenização enviada com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = './aceiteIndenizacao.html';
        }
      })
    }
  })
}

// Função para exibir modal de processamento de indenização
function aceiteIndenizacao() {
  let timerInterval
  Swal.fire({
    title: 'Processando Indenização...',
    html: 'O aceite de indenização será processado em <b></b> milisegundos.',
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      // Atualiza o tempo restante a cada 100ms
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
// Se o temporizador foi concluído, exibe mensagem de sucesso e redireciona para a página de aceite de indenização
    if (result.dismiss === Swal.DismissReason.timer) {

      Swal.fire({
        title:  'Concluído!',
        text: 'A indenização foi realizada com sucesso!', 
        icon : 'success'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = './aceiteIndenizacao.html';
        }
      })
    }
  })
}

// Adiciona um evento de clique ao elemento com ID "informacoesIndenizacao" para redirecionar para a página de informações de indenização
document.getElementById('informacoesIndenizacao').addEventListener('click', async () => {
  window.location.href = './indenizacaoInformacoes.html';
});

// Adiciona um evento de clique ao elemento com ID "voltarDashboard" para redirecionar para a página do dashboard do administrador
document.getElementById('voltarDashboard').addEventListener('click', async () => {
  window.location.href = '../Dashboard/dashboardAdm.html';
});

// Função para redirecionar para a página de aceite de indenização
function voltarIndenizacoes() {
  window.location.href = './aceiteIndenizacao.html';
}

