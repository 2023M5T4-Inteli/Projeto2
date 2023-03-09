// Quando o botão "Conectar" for clicado
document.getElementById('conectar').addEventListener('click', async () => {
    // Verificar se a carteira Metamask está instalada
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Solicitar acesso à carteira Metamask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Conectar à carteira Metamask
        const web3 = new Web3(window.ethereum);
        // Exibir o endereço da carteira conectada
        const accounts = await web3.eth.getAccounts();
        alert('Conectado com sucesso!');
        const enderecoElemento = document.getElementById('endereco');
        enderecoElemento.textContent = `Endereço da carteira: ${accounts[0]}`;
        // Exibir o saldo da carteira conectada
        const balanceWei = await web3.eth.getBalance(accounts[0]);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        const saldoElemento = document.getElementById('saldo');
        saldoElemento.textContent = `Saldo da carteira: ${balanceEth} ETH`;
      } catch (error) {
        // O usuário não concedeu permissão ou algo deu errado
        alert('Falha ao conectar à carteira Metamask.');
        console.error(error);
      }
    } else {
      // A carteira Metamask não está instalada
      alert('Por favor, instale a carteira Metamask para se conectar.');
    }
  });


  // Quando o botão "Desconectar" for clicado
document.getElementById('desconectar').addEventListener('click', async () => {
    try {
      // Desconectar da carteira Metamask
      alert('Desconectado com sucesso!');
      // Limpar os elementos HTML que exibem os dados da carteira
      const enderecoElemento = document.getElementById('endereco');
      enderecoElemento.textContent = '';
      const saldoElemento = document.getElementById('saldo');
      saldoElemento.textContent = '';
    } catch (error) {
      // O usuário não concedeu permissão ou algo deu errado
      console.error(error);
    }
});
