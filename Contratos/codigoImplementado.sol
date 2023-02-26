//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract cooverContract {
 
    address owner; // Endereço do dono do contrato
    uint public creationDate; //data de criação
    uint public monthly; // Valor mensal do seguro
    uint public balance; // 
    uint public numberusers; // Numero total de adeptos ao contrato
    bool public isActive; // Contrato está ativo ou inativo (true e false)
    uint public coverage; // Valor de cobertura do objeto assegurado
    address[] private users;
    mapping (address => uint) public participants; // Endereço dos usuários e o preço pago por eles
    struct Wallet {
    address userWallet;
    }
    Wallet[] public wallet;

    // Constructor é uma função que roda apenas uma vez na hora do deploy
    constructor(uint _balance) {
        balance = _balance;
        numberusers = 0;
        creationDate = block.timestamp; //salva a data da criação do contrato
        isActive = true;
        owner = msg.sender; // Garante que aquele que fez o deploy é o dono do contrato
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
        return address(this).balance;
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

} 