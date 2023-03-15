function confirmCreation() {

    Swal.fire({
        title: 'Deseja criar um novo grupo?',
        text:   'Verifique se as informações para criação de um novo grupo mútuo estão corretas, uma vez feito, não poderá ser alterado.',
        showCancelButton: true,
        confirmButtonText: 'Criar Grupo',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        customClass: {
          container: 'container',
          title: 'swal-title',
          text: 'swal-text',
          confirmButton: 'btn btn-primario',
          cancelButton: 'btn btn-secundario'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Ação confirmada pelo usuário
          // Coloque o código que deve ser executado em caso de confirmação aqui
          console.log('confirmou')
        } else if (result.isDenied) {
            // Ação cancelada pelo usuário
            // Coloque o código que deve ser executado em caso de cancelamento aqui
            console.log('negou')
        }
      });
      

}