function confirmCreation() {

    Swal.fire({
        text:   'login realizado com sucesso !',
        confirmButtonText: 'Continuar',
        buttonsStyling: false,
        customClass: {
          container: 'container',
          title: 'swal-title',
          text: 'swal-text',
          confirmButton: 'btn btn-primario',
        }
    }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "../Dashboard/dashboardADM.html";
          console.log('confirmou')
        }
    })}

function alert(){
    
    Swal.fire({
        title: 'Não recebeu o código?', 
        html: 'Verifique se digitou o e-mail corretamente. <br>Talvez o código esteja na sua caixa de spam.<br> <u>henri.harari@gmail.com</u> <br> ',
        confirmButtonText: 'Reenviar código',
        buttonsStyling: false,
        customClass: {
          container: 'container',
          confirmButton: 'btn btn-primario',
    
        }

    })

}