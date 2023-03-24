
// Função para exibir modal de verificação
function confirmCreation() {

    Swal.fire({
        title:   'Código Verificado',
        text:  'O login foi realizado com sucesso! Você será redirecionado para a página inicial.',
        confirmButtonText: 'Continuar',
        buttonsStyling: false,
    }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "../Dashboard/dashboardADM.html";
          console.log('confirmou')
        }
    })}
    
// Função para exibir modal de alerta
function alert(){
    
    Swal.fire({
        title: 'Não recebeu o código?', 
        html: 'Verifique se digitou o e-mail corretamente. <br>Talvez o código esteja na sua caixa de spam.<br> <u>henri.harari@gmail.com</u> <br> ',
        confirmButtonText: 'Reenviar código',
        buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Código reenviado!',
          'Verifique sua caixa de entrada e spam.',
          'question'
        )
      }
})}

