import web3 from 'web3';

  async function realizarTransacao() {

    const enderecoContrato = '0xfe92C6E4b1F2046fFC088529c783797e808e587A';
    const abiContrato = require('../../../Deploy/build/contracts/cooverContract.json').abi;

    // solicita ao usuário para conectar sua conta MetaMask
    await window.ethereum.enable();
  
    // cria uma instância do web3
    var web3 = new Web3(window.ethereum);
  
    // define a conta padrão como a que está conectada à MetaMask
    web3.eth.defaultAccount = (await web3.eth.getAccounts())[0];
  
    // define o endereço da carteira que receberá o valor
    var enderecoDestino = "0x59017cF327bA4F836DD3b491111537BD221D178D"; // substitua pelo endereço desejado
  
    // recupera o valor com desconto do Local Storage
    var valor = localStorage.getItem("valor");
  
    // cria um objeto de transação com os parâmetros necessários, usando o valor com desconto
    var txObj = {
      from: web3.eth.defaultAccount,
      to: enderecoDestino,
      value: web3.utils.toWei(valor.toString(), "ether")
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
                var hashTransacao = result;
                localStorage.setItem("hashTransacao", hashTransacao);
            }
            })
      }
    });
}

function salvar() {

  // Mandar para o banco de dados
  alert('Inserindo dados pessoais...')
  const nome = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const modelo = document.getElementById('modelo').value;
  const valor = document.getElementById('valorCelular').value;
  localStorage.setItem("valor", valor);

  console.log(nome,email,modelo,valor)

  fetch('http://localhost:3091/dadosPessoais', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
  },
    body: JSON.stringify({ nome, email, modelo, valor })
  })
  .then((response) => {
    if (response.ok) {
      window.location.href = '../Escolha dos grupos/escolhaGrupoInicio.html';
    } else {
      throw new Error('Erro ao salvar os seus dados.');
    }
  })
  .catch((error) => {
    alert(error.message);
  });
}



  