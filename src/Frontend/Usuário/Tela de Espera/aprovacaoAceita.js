const confirmarTransacao = document.querySelector('#confirmar');


confirmarTransacao.addEventListener('click', () => {
    Swal.fire({
        title: 'Deseja realizar a transação?',
        text: "A partir do momento da confirmação, o dispositivo cadastrado estará sendo segurado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00C171',
        cancelButtonColor: '#eb3737',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'O pagamento está sendo realizado',
                text: 'Aguarde um momento e você será redirecionado para a plataforma.',
                showConfirmButton: true,                                                                                                                                                                                               
            })
            window.location.href = '../Dashboard/dashboardUser.html';
            
            


        }

      })
 
})