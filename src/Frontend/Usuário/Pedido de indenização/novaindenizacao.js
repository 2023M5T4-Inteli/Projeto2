function solicitarIndenizacao(){
  // pega as informações digitadas pelo usuário
  var grupo = document.getElementById("selecaoGrupo").value;
  var data = document.querySelector(".inputDataOcorrido").value;
  var ocorrido = document.getElementById("selecaoOcorrido").value;
  var arquivo = document.getElementById("file").value;
  
  // salva as informações no localStorage
  localStorage.setItem("grupoSelecionado", grupo);
  localStorage.setItem("dataOcorrido", data);
  localStorage.setItem("motivoOcorrido", ocorrido);
  localStorage.setItem("arquivoProvas", arquivo);

  let timerInterval
    Swal.fire({
    title: 'Processando solicitação!',
    html: 'A solicitação de indeniização está sendo processada. Aguarde <b></b> milisegundos.',
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
            title: 'Solicitação enviada!',
            text: "Sua solicitação de indenização foi enviada com sucesso! Aguarde a resposta da seguradora acerca do aceite e / ou a transação em sua wallet.",
            icon: 'sucess',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "./pedidoIndenizacao.html";
            }
          })
    }
    })
}