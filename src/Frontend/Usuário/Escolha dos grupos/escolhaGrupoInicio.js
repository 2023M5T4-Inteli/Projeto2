const entrarGrupo = document.querySelector('#entrarGrupo');
const solicitarGrupo = document.querySelector('#solicitarGrupo');
const informacaoIcon = document.querySelector('#informacaoIcon');
const informacaoIconSeguro = document.querySelector('#informacaoIconSeguro');
const informacaoIconImei = document.querySelector('#informacaoIconImei');


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
            Swal.fire({
                icon: 'success',
                title: 'Sua solicitação foi enviada para a Coover!',
                showConfirmButton: false,
                timer: 3000
            })
            window.location.href = '../Tela de Espera/esperaAprovacaoInicio.html';
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
              Swal.fire({
                  icon: 'success',
                  title: 'Sua solicitação foi enviada para a Coover!',
                  showConfirmButton: false,
                  timer: 3000
              })
              window.location.href = '../Tela de Espera/esperaAprovacaoInicio.html';
          }
      })
});

informacaoIcon.addEventListener('click', () => {
  Swal.fire('O tipo de seguro está relacionado com o tipo de ocorrência que o contrato irá cobrir!')
});

informacaoIconSeguro.addEventListener('click', () => {
  Swal.fire('O seguro mútuo é uma forma coletiva de seguro onde os próprios segurados contribuem financeiramente para cobrir eventualidades previstas, onde não possui uma instituição regulamentadora.')
});

informacaoIconImei.addEventListener('click', () => {
  Swal.fire('IMEI significa "Identificação Internacional de Equipamento Móvel", e é um código numérico exclusivo atribuído a cada dispositivo móvel (como smartphones e tablets) que utiliza a tecnologia de rede celular. Descubra como encontrar o seu em: https://tecnoblog.net/responde/descobrir-imei-celular-roubado/')
});



function escolhaGrupo() {

  // Mandar para o banco de dados
  alert('Enviando solicitação para a Coover..')
  const grupoEscolhido = document.getElementById('grupo1').value;
  const imei = document.getElementById('imei').value;


  console.log(grupoEscolhido, imei)

  fetch('http://localhost:3092/escolhaGrupoInicio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
  },
    body: JSON.stringify({ grupoEscolhido, imei })
  })
  .then((response) => {
    if (response.ok) {
      window.location.href = '..Tela de Espera/esperaAprovacaoInicio.html';
    } else {
      throw new Error('Erro em enviar a solicitação.');
    }
  })
  .catch((error) => {
    alert(error.message);
  });
}


