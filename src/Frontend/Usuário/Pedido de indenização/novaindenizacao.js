// Função para solicitar indenização
function solicitarIndenizacao(){
  // Obtém as informações digitadas pelo usuário
  var grupo = document.getElementById("selecaoGrupo").value;
  var data = document.querySelector(".inputDataOcorrido").value;
  var ocorrido = document.getElementById("selecaoOcorrido").value;
  var arquivo = document.getElementById("file").value;
  
  // Salva as informações no localStorage
  localStorage.setItem("grupoSelecionado", grupo);
  localStorage.setItem("dataOcorrido", data);
  localStorage.setItem("motivoOcorrido", ocorrido);
  localStorage.setItem("arquivoProvas", arquivo);
  
  // Exibe uma mensagem de processamento para o usuário
let timerInterval;
  Swal.fire({
    title: 'Processando solicitação!',
    html: 'A solicitação de indenização está sendo processada. Aguarde <b></b> milisegundos.',
    timer: 3000,
    timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector('b');
      timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft();
      }, 100);
      },
      willClose: () => {
      clearInterval(timerInterval);
      }
    }).then((result) => {
    // Quando a mensagem for fechada pelo usuário
    if (result.dismiss === Swal.DismissReason.timer) {
      // Exibe uma mensagem de confirmação e redireciona para a página de pedido de indenização
      Swal.fire({
      title: 'Solicitação enviada!',
      text: "Sua solicitação de indenização foi enviada com sucesso! Aguarde a resposta da seguradora acerca do aceite e / ou a transação em sua wallet.",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
        window.location.href = "./pedidoIndenizacao.html";
        }
      });
    }
    });
  }
  
  // A função acima é usada para permitir que o usuário solicite uma indenização. Primeiro, as informações são obtidas do formulário e salvas no localStorage. Em seguida, é exibida uma mensagem de processamento para o usuário usando o SweetAlert. Depois que a mensagem é fechada, uma mensagem de confirmação é exibida e o usuário é redirecionado para a página de pedido de indenização.