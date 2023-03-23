const sairGrupo = document.querySelector('#sairGrupo');
const renovarGrupo = document.querySelector('#renovarGrupo');
const sairConta = document.querySelector('#saida');


sairGrupo.addEventListener('click', () => {
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

renovarGrupo.addEventListener('click', () => {
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

sairConta.addEventListener('click', () => {
    Swal.fire({
        title: 'Deseja sair da sua conta?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00C171',
        cancelButtonColor: '#eb3737',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    })
})

          
mudancaCards();
  // pega o elemento select
  var select = document.getElementById("selecao");
  
  // adiciona um evento onchange ao select
  select.onchange = function() {
    mudancaCards(select.value)
  }


  // pega o valor selecionado
  function mudancaCards(valor){
    // verifica se o valor selecionado é a opção
    if (window.innerWidth > 481) {
      if (valor == "Grupo 1") {
        // mostra os campos e o botão
        document.getElementById("maisInformacoes").style.display = "flex";
        document.getElementById("botao").style.display = "block";
      } else {
        // oculta os campos e o botão
        document.getElementById("maisInformacoes").style.display = "none";
        document.getElementById("botao").style.display = "none";
      }
    } else {
      if (valor == "Grupo 1") {
        // mostra os campos e o botão
        document.getElementById("linha1").style.display = "flex";
        document.getElementById("botao").style.display = "block";
      } else {
        // oculta os campos e o botão
        document.getElementById("maisInformacoes").style.display = "none";
        document.getElementById("botao").style.display = "none";
      }
    }
  }





  