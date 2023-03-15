const entrarGrupo = document.querySelector('#entrarGrupo');
const solicitarGrupo = document.querySelector('#solicitarGrupo');

entrarGrupo.addEventListener('click', () => {
    Swal.fire({
        title: 'Deseja entrar no grupo?',
        text: "Após a confirmação a solicitação será encaminhada para o gerenciamento de seguros.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00C171',
        cancelButtonColor: '#eb3737',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("ok")
        }
    })
});

solicitarGrupo.addEventListener('click', () => {
    Swal.fire({
        title: 'Deseja criar um novo grupo?',
        text: 'Digite o nome do grupo que deseja criar e espere até que receba uma notificação que ele foi criado para conseguir entrar nele.',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#00C171',
        cancelButtonColor: '#eb3737',
        confirmButtonText: 'Solicitar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true
        }).then((result) => {
        if (result.isConfirmed) {
            var nomeGrupo = result.value;
            Swal.fire({
                icon: 'success',
                title: 'Solicitação enviada com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(nomeGrupo)
        }
    })
});

