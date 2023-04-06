const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const fetchData = async () => {

  fetch(`http://localhost:3081/dadosPessoais/${id}`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
    }
  })
  .then(async (response) => {
    if (response.ok) {
      let json = await response.json();
      json = json.data

      const grupoInde = document.getElementById('grupoInde');
      const imeiInde = document.getElementById('imeiInde');
      const dataInde = document.getElementById('dataInde');
      const motivoInde = document.getElementById('motivoInde');
      const carteiraInde = document.getElementById('carteirInde');

      grupoInde.innerHTML = json.grupo1;
      imeiInde.innerHTML = json.imei;
      dataInde.innerHTML = json.data;
      motivoInde.innerHTML = json.motivo;
      carteiraInde.innerHTML = json.walletAddress;

      
    } else {
      throw new Error('Erro ao salvar os seus dados.');
    }
  })
  .catch((error) => {
    alert(error.message);
  });

}

window.addEventListener('load', fetchData);

function execute(){
  Swal.fire({
    title:  'Atenção!',
    text: 'Copie a carteira do usuário e continue o processo de indenização pelo remix!', 
    icon : 'attention',
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = '../Dashboard/dashboardADM.html';
    }
  })
}

// Função para exibir modal de recusa de indenização
onload = indenizacoes();

function recusaIndenizacao(){

  Swal.fire({
    title: 'Recusa de Indenização',
    text: 'Qual o motivo da recusa da indenização?', 
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
  }).then((result) => {
// Se o botão confirmar foi clicado, exibe mensagem de sucesso e redireciona para a página de aceite de indenização
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Recusa de Indenização',
        text: 'Recusa de indenização enviada com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = './aceiteIndenizacao.html';
        }
      })
    }
  })

}

// Adiciona um evento de clique ao elemento com ID "informacoesIndenizacao" para redirecionar para a página de informações de indenização
document.getElementById('informacoesIndenizacao').addEventListener('click', async () => {
  window.location.href = './indenizacaoInformacoes.html';
});

// Adiciona um evento de clique ao elemento com ID "voltarDashboard" para redirecionar para a página do dashboard do administrador
document.getElementById('voltarDashboard').addEventListener('click', async () => {
  window.location.href = '../Dashboard/dashboardAdm.html';
});

// Função para redirecionar para a página de aceite de indenização
function voltarIndenizacoes() {
  window.location.href = './aceiteIndenizacao.html';
}

//___________________________________________________________________________________________________

async function Tentativaintegracao() {
  if (typeof window.ethereum !== "undefined") {
    const abi = [
      [
        {
          inputs: [
            {
              internalType: "address[]",
              name: "integrantes",
              type: "address[]"
            },
            {
              internalType: "uint256[]",
              name: "imei",
              type: "uint256[]"
            }
          ],
          stateMutability: "nonpayable",
          type: "constructor"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "contratantes",
              type: "address"
            }
          ],
          name: "aceitarIndenizacao",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [],
          name: "entrar",
          outputs: [],
          stateMutability: "payable",
          type: "function"
        },
        {
          inputs: [],
          name: "getAdress",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_mudanca",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "_value",
              type: "uint256"
            },
            {
              internalType: "string",
              name: "oper",
              type: "string"
            }
          ],
          name: "modificarSaldo",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [],
          name: "obterSaldo",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "pagamentoInicial",
          outputs: [],
          stateMutability: "payable",
          type: "function"
        },
        {
          inputs: [],
          name: "partContrato",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address"
            }
          ],
          name: "partImei",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address"
            }
          ],
          name: "partValor",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address"
            }
          ],
          name: "pedidos",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "quantidade",
              type: "uint256"
            }
          ],
          name: "pedirIndenizacao",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "usuario",
              type: "address"
            }
          ],
          name: "reposicaoReserva",
          outputs: [],
          stateMutability: "payable",
          type: "function"
        },
        {
          inputs: [],
          name: "saldoContrato",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "saldo_Contrato",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "totalContrato",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [],
          name: "usuarios",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256"
            }
          ],
          stateMutability: "view",
          type: "function"
        },
        {
          inputs: [
            {
              internalType: "address payable",
              name: "_to",
              type: "address"
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256"
            }
          ],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function"
        }
      ]
    ];

  
    const address = "0xd56108AE5f1051433E60bEbbA8Ac6d3c3d254b1C";

    const web3 = new Web3(
      new Web3.providers.HttpProvider(
          `https://goerli.infura.io/v3/465bc8fcae5f45f5b044b7b96aa27e47`
      )
    );
    window.contract = await new web3.eth.Contract(abi, address);

    alert("Connected to Smart Contract.");
    depositContract();
  }

  async function depositContract() {

    const addressNew = "0x9f80aC649f0244330aDB623D5D56c6b7db71bf3A";
    const amount = 0.003;
    await window.contract.methods.withdraw(addressNew, amount).send({from: addressNew});
  
  }
  
}