const solicitarSinistro = document.querySelector('#botaoSolicitar');


solicitarSinistro.addEventListener('click', () => {
    Swal.fire({
        title: 'Deseja sair do grupo?',
        text: "Uma vez que pedir para sair, só poderá entrar novamente caso tenha vaga e seja aberta outra solicitação.",
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
                title: 'Você acabou de sair do grupo.',
                text: 'Suas informações não constam mais neste grupo, você será redirecionado a tela inicial, onde poderá entrar em um novo grupo e/ou sair da plataforma.',
                showConfirmButton: false,
                timer: 3000
            })
            console.log(nomeGrupo)
        }
      })
})