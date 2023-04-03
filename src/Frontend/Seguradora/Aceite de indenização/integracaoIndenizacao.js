// Cria uma instância do objeto Web3
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// Definimos o endereço e a ABI do contrato inteligente
const contractAddress = "Ox60cd81aeE3fdo26231C16F230981352443F18537";
const contractAbi = require('../../../Deploy/build/contracts/cooverContract.json')

// Cria uma instância do contrato inteligente
const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);

// Adiciona um evento de clique ao botão de aprovar indenização
document.getElementById("aceiteIndenizacao").addEventListener("click", function() {
  
  // Chama o método do contrato inteligente para aprovar a indenização
  contractInstance.methods.aceitarIndenizacao(0xe3f1BdC0c7F7f86E9E055b7cB2e3C1af86D58CC0).send({
    from: web3.eth.accounts[0],
    value: web3.utils.toWei(0.02, "ether")
  })
  .on("receipt", function(receipt) {
    console.log(receipt);
    alert("Indenização aprovada com sucesso!");
  })
  .on("error", function(error) {
    console.error(error);
    alert("Erro ao aprovar a indenização!");
  });
});
