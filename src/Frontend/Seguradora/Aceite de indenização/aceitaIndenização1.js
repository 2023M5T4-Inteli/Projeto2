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
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
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

document.getElementById('informacoesIndenizacao').addEventListener('click', async () => {
  window.location.href = './indenizacaoInformacoes.html';
});

document.getElementById('voltarDashboard').addEventListener('click', async () => {
  window.location.href = '../Dashboard/dashboardAdm.html';
});

function voltarIndenizacoes() {
  window.location.href = './aceiteIndenizacao.html';
}

