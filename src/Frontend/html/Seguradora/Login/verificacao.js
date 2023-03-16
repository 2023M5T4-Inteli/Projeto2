function confirmCreation() {

    Swal.fire({
        text:   'login realizado com sucesso !',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        customClass: {
          container: 'container',
          title: 'swal-title',
          text: 'swal-text',
          confirmButton: 'btn btn-primario',
        }
    }).then((result) => {
        if (result.isConfirmed) {
          // Ação confirmada pelo usuário
          // Coloque o código que deve ser executado em caso de confirmação aqui
          console.log('confirmou')
        }
    })}