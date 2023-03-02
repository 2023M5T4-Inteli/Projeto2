//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract cooverContract {
 
    address owner; // Endereço do dono do contrato
    uint public creationDate; //data de criação
    uint public monthly; // Valor mensal do seguro
    uint public balance; // 
    uint public maxUsers;
    uint public minUsers;
    uint public numberusers; // Numero total de adeptos ao contrato
    bool public isActive; // Contrato está ativo ou inativo (true e false)
    uint public coverage; // Valor de cobertura do objeto assegurado
    address[] private users;
    mapping (address => uint) public participants; // Endereço dos usuários e o preço pago por eles
    mapping (address => uint) public valorParticipants;
    struct Wallet {
    address userWallet;
    }
    Wallet[] public wallet;

    // Constructor é uma função que roda apenas uma vez na hora do deploy
    constructor( uint _minUsers, uint _maxUsers, uint _numberusers, address[] memory integrantes, uint[] memory imei ) {

        for(uint i = 0; i<integrantes.length; i++){
            participants[integrantes[i]] = imei[i];
        }
        minUsers = _minUsers;
        maxUsers = _maxUsers;
        numberusers = _numberusers;
        creationDate = block.timestamp; //salva a data da criação do contrato
        isActive = true;
        owner = msg.sender; // Garante que aquele que fez o deploy é o dono do contrato
    }

     // Verifica a viabilidade do contrato (FAZER USER STORY - vai ser um teste da user story 1)
    function viabilidadeContrato() public view returns (uint) {
        if (numberusers >= minUsers && block.timestamp <= creationDate && numberusers <= maxUsers) {
            return 1; // Contrato Ativo
        } else if (numberusers < minUsers && block.timestamp <= creationDate) {
            return 2; // Contrato em Progresso
        } else if (block.timestamp > creationDate && numberusers < minUsers) {
            return 3; // Contrato Inativo
        } else {
            revert("Erro ao verificar o contrato");
        }
    }

    function pagamentoInicial() public payable{
        valorParticipants[msg.sender] += msg.value;
         
    }


    function join() public payable {
        require(msg.value == monthly, "Valor incorreto");
        require(isActive == true, "Contrato inativo");
        require(participants[msg.sender] == 0, "Ja participante");
        participants[msg.sender] = msg.value;
        numberusers += 1;
    }

    function changeBalance(address _mudanca, uint _value, string memory oper) public {
        require(msg.sender == owner, "nao dono");
        require(keccak256(bytes(oper)) == keccak256(bytes("sub")) || keccak256(bytes(oper)) == keccak256(bytes("plus")), "so sub ou plus");
        if (keccak256(bytes(oper)) == keccak256(bytes("sub"))) {
            require(participants[_mudanca] >= _value, "Sem saldo suficiente");
            participants[_mudanca] -= _value;
            payable(owner).transfer(_value);
        } else if (keccak256(bytes(oper)) == keccak256(bytes("plus"))) {
            participants[_mudanca] += _value;
        }
    }
    
    function getBalance() public view returns (uint) {
        return valorParticipants[msg.sender];
    }

    // Função para remover um usuário do projeto
   function removeUser(address usuario) public {
    require(msg.sender == owner, "nao dono");
      for (uint i = 0; i < wallet.length; i++) {
          if (wallet[i].userWallet == usuario) {
              // Retira a Wallet da lista
              delete wallet[i];
              // Retira um usuário do número de usuários
              for (uint j = i; j < users.length - 1; j++) {
                  users[j] = users[j+1];
              }
              users.pop();
              // Atualiza o número de usuários
              numberusers --;
              // Quebra o loop
              break;
          }
      }
  }
    // Função para solicitar indenização
function solicitarIndenizacao() public {
    require(participants[msg.sender] > 0, "Nao e participante do contrato.");
    require(isActive == true, "Contrato inativo.");

    // Realiza o pagamento da indenização
    payable(msg.sender).transfer(coverage);

    // Atualiza o saldo do contrato
    balance -= coverage;

    // Remove o usuário da lista de usuários
    for (uint i = 0; i < users.length; i++) {
        if (users[i] == msg.sender) {
            users[i] = users[users.length - 1];
            users.pop();
            break;
        }
    }

    // Atualiza o número de usuários
    numberusers -= 1;

    // Remove o usuário da lista de participantes
    delete participants[msg.sender];
}


    
}

