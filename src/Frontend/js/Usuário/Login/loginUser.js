let enderecoCarteira;
let saldoCarteira;

// Quando o botão "Conectar" for clicado
document.getElementById('conectar').addEventListener('click', async () => {
    // Verificar se a carteira Metamask está instalada
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Solicitar acesso à carteira Metamask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Conectar à carteira Metamask
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const balanceWei = await web3.eth.getBalance(accounts[0]);

        const Metamask = true;
        if (Metamask == true) {
          Swal.fire({
            title: 'Carteira conectada!',
            text: "Login realizado com sucesso!",
            icon: 'success',
            confirmButtonColor: '#00C171',
          }).then((result) => {
            window.location.href = "../../../html/Usuário/Dados Pessoais/dadosPessoais.html";

            // Exibir o endereço da carteira conectada
            
            // enderecoCarteira = accounts[0];
            // const enderecoElemento = document.getElementById('endereco');
            // enderecoElemento.textContent = `Endereço : \n\n ${accounts[0]}`;
            // const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
            // saldoCarteira = balanceEth;
            // const saldoElemento = document.getElementById('saldo');
            // saldoElemento.textContent = `Saldo :  ${balanceEth} ETH`;
            // const info = document.getElementById('info');
            // info.textContent = `Informações da carteira:`;
            // const continuar = document.getElementById('continuar');
            // continuar.textContent = `Continuar`;
            // continuar.style.background = "#00C171";
          })
        }

      } catch (error) {
        // O usuário não concedeu permissão ou algo deu errado
        console.error(error);
      }
    } else {
      // A carteira Metamask não está instalada
      alert('Por favor, instale a carteira Metamask para se conectar.');
    }
  });

//   function createHash() {
//     const inputValue = document.getElementById('inputValue').value;
//     const hash = CryptoJS.SHA256(inputValue);
//     const hashImeiResult = document.getElementById('hash');
//     hashImeiResult.textContent = `${hash}`;
//     const hashAparelho = document.getElementById('hashAparelho');
//     hashAparelho.textContent = `IMEI do aparelho : `;
//     hashImeiResult.style.background = "#5f5f5f";
//   }

