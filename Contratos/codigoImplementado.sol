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
    mapping (address => uint) public balanceUser; // Mapeamento do valor, dentro do endereço para identificação do saldo do contrato.

    struct Wallet {
    address userWallet;
    }
    Wallet[] public wallet;

    // Constructor é uma função que roda apenas uma vez na hora do deploy
    constructor(uint _balance, uint _minUsers, uint _maxUsers, uint _numberusers) {
        balance = _balance;
        minUsers = _minUsers;
        maxUsers = _maxUsers;
        numberusers = _numberusers;
        creationDate = block.timestamp; //salva a data da criação do contrato
        isActive = true;
        owner = msg.sender; // Garante que aquele que fez o deploy é o dono do contrato
    }

    function join() public payable {
        require(msg.value == monthly, "Valor incorreto"); // exige que o valor enviado pelo usuário seja igual a "monthly"
        require(isActive == true, "Contrato inativo"); // exige que o contrato esteja ativo
        require(participants[msg.sender] == 0, "Ja participante"); // exige que o usuário ainda não tenha se registrado
        participants[msg.sender] = msg.value; // armazena o valor enviado pelo usuário na variável "participants"
        numberusers += 1; // incrementa o número total de usuários
    }

    function changeBalance(address _mudanca, uint _value, string memory oper) public {
        require(msg.sender == owner, "nao dono"); // exige que o chamador da função seja o proprietário do contrato
        require(keccak256(bytes(oper)) == keccak256(bytes("sub")) || keccak256(bytes(oper)) == keccak256(bytes("plus")), "so sub ou plus"); // exige que a operação seja apenas "sub" ou "plus"
        if (keccak256(bytes(oper)) == keccak256(bytes("sub"))) {
            require(participants[_mudanca] >= _value, "Sem saldo suficiente"); // exige que o usuário tenha saldo suficiente para subtrair o valor
            participants[_mudanca] -= _value; // subtrai o valor da variável "participants" do usuário
            payable(owner).transfer(_value); // transfere o valor subtraído para o proprietário do contrato
        } else if (keccak256(bytes(oper)) == keccak256(bytes("plus"))) {
            participants[_mudanca] += _value; // adiciona o valor à variável "participants" do usuário
        }
    }

    function getBalance() public view returns (uint) {
        return address(this).balance; // retorna o saldo atual do contrato
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

    function addBalance(address user, uint value) public {
        balanceUser[user] += value; // adds the value to the balance of the specified user stored in the "balance" variable
    }

    function replenishReserve(address user) public payable {
        require(contractBalance == 0, "The contract reserve needs to be replenished"); // requires the contract balance to be zero
        contractBalance = balanceUser[user]; // stores the balance of the specified user in the "contractBalance" variable
    }


} 






  



