

function confirmaTransacao() {
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
          window.location.href = "../Dashboard/dashboardUser.html";
          console.log('confirmou')
        }
    })}
