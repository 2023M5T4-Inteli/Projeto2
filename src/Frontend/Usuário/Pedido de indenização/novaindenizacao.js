const botaoSolicitar = document.querySelector('#botaoSolicitar');


botaoSolicitar.addEventListener('click', () => {
    Swal.fire({
        title: 'Deseja renovar o seguro?',
        text: "A renovação é anual e o valor a ser pago, será de acordo com o seu celular cadastrado. Ficando dependente de existir uma quantidade mínima de pessoas para o mesmo ficar ativo.",
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
                title: 'Você acabou de renovar o seu seguro!',
                text: 'Seu seguro foi renovado por mais um ano, você pode acompanhar as informações dele na aba de seguros. Qualquer problema, entre em contato conosco.',
                showConfirmButton: false,
                timer: 3000
            })
            console.log(nomeGrupo)
        }
      })
})