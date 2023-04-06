document.getElementById('confirmar').addEventListener('click', async () => {

    // solicita ao usuário para conectar sua conta MetaMask
    await window.ethereum.enable();
  
    // cria uma instância do web3
    var web3 = new Web3(window.ethereum);
  
    // define a conta padrão como a que está conectada à MetaMask
    web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
  
    // define o endereço da carteira que receberá o valor
    // var enderecoDestino = "0xd56108AE5f1051433E60bEbbA8Ac6d3c3d254b1C"; // substitua pelo endereço desejado
    var enderecoDestino = "0x59017cF327bA4F836DD3b491111537BD221D178D"; // substitua pelo endereço desejado
  
    // recupera o valor com desconto do Local Storage
    var valorFinney = 0.1;

    // cria um objeto de transação com os parâmetros necessários, usando o valor com desconto em finney
    var txObj = {
      from: web3.eth.defaultAccount,
      to: enderecoDestino,
      value: web3.utils.toWei(valorFinney.toString(), "finney")
    };

    // envia a transação para a rede Ethereum
    web3.eth.sendTransaction(txObj, function(error, result) {
      if (error) {
        let timerInterval
            Swal.fire({
            title: 'Processando...',
            html: 'Transação em andamento. Aguarde <b></b> milissegundos.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Transação não realizada! Tente novamente.'
                })
            }
            })

      } else {
            let timerInterval
            Swal.fire({
            title: 'Processando...',
            html: 'Transação em andamento. Aguarde <b></b> milissegundos.',
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                    icon: 'sucess',
                    title: 'Concluído!',
                    text: 'Transação realizada com sucesso!'
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      window.location.href = '../Dashboard/dashboardUser.html';
                    }
                  })
            }
            })
      }
    });
  });

  // Quando o botão "Conectar" for clicado
async function loginUser(){
  // Verificar se a carteira Metamask está instalada
  if (typeof window.ethereum !== 'undefined') {
    try {

      const [carteira] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Conectar à carteira Metamask
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const balanceWei = await web3.eth.getBalance(accounts[0]);
      
      // Salva o endereço da carteira em uma variável
      const enderecoCarteira = carteira;

      localStorage.setItem('enderecoCarteira', enderecoCarteira);
      
      // Use a variável "enderecoCarteira" como quiser
      console.log(`Endereço da carteira: ${enderecoCarteira}`);

      Swal.fire({
        icon: 'sucess',
        title: 'Concluído!',
        text: 'Login realizado com sucesso!'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          window.location.href = '../Dados Pessoais/dadospessoais.html';
        }
      })

    } catch (error) {
      // O usuário não concedeu permissão ou algo deu errado
      console.error(error);
    }
  } else {
    // A carteira Metamask não está instalada
    alert('Por favor, instale a carteira Metamask para se conectar.');
  }
}



function salvarDado() {
  const nome = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const modelo = document.getElementById('modelo').value;
  const valor = document.getElementById('valorCelular').value;

  localStorage.setItem("valor", valor);
  localStorage.setItem("nome", nome);
  localStorage.setItem("email", email);
  localStorage.setItem("modelo", modelo);

  console.log(nome, email, modelo, valor);

  Swal.fire({
    icon: 'sucess',
    title: 'Concluído!',
    text: 'Dados salvos com sucesso!'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      window.location.href = '../Escolha dos grupos/escolhaGrupo.html';
    }
  })
}

function entrarNoGrupo(event) {

  event.preventDefault()

  const imeiCelular = document.getElementById('imei').value;
  const grupo = document.getElementById('grupo1').value;
  const nome = localStorage.getItem("nome");
  const email = localStorage.getItem("email");
  const modelo = localStorage.getItem("modelo");
  const valor = localStorage.getItem("valor");
  const enderecoCarteira = localStorage.getItem("enderecoCarteira");

  console.log(nome, email, modelo, valor, imeiCelular, grupo, enderecoCarteira);

  fetch('http://localhost:3081/dadosPessoais', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
  },
    body: JSON.stringify({ nome, email, modelo, valor, imeiCelular, grupo, enderecoCarteira})
  })
  .then(async (response) => {
    if (response.ok) {
      const json = await response.json();
      window.sessionStorage.setItem("idUsuario", json.id);
      window.location.href = '../Tela de Espera/esperaAprovacaoInicio.html';
      alert('Dados salvos com sucesso!');
    } else {
      throw new Error('Erro ao salvar os seus dados.');
    }
  })
  .catch((error) => {
    alert(error.message);
  });

}
