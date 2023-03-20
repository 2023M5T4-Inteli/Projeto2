function confirmCreation() {
  Swal.fire({
    title: 'Qual o motivo de aceitar o sinistro?',
    text: 'Tipo de Recusa',
    showCancelButton: true,
    confirmButtonText: 'Enviar',
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
      switch(result.value) {
        case 'motivo1':
          // código a ser executado caso o valor seja motivo1
          break;
        case 'motivo2':
          // código a ser executado caso o valor seja motivo2
          break;
        default:
          // código a ser executado caso o valor não seja nem motivo1 nem motivo2
      }
    }
  });
}