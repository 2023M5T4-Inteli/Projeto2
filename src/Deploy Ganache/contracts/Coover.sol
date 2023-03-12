//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract cooverContract{
 
    address owner; // Endereço do dono do contrato
    uint public monthly; // Valor mensal do seguro
    uint public users; // Número total de adeptos ao contrato
    bool public isActive; // Contrato está ativo ou inativo (true e false)
    uint public coverage; // Valor de cobertura do objeto assegurado
    uint public balance; // Saldo da carteira 
    mapping (address => uint) public participants; // Endereço dos usuarios e o preço pago por eles

// Constructor é uma função que roda apenas uma vez na hora do deploy
    constructor(){
        users = 0; 
        isActive = true;
        owner = msg.sender; // Garante que aquele que fez o deploy é o dono do contrato
    }
    
// Permite que os usuários participem do contrato de seguro pagando o valor mensal
    function join() public payable {
    require(msg.value == monthly, "O valor do pagamento esta errado"); // Verifica se o valor enviado é igual ao valor mensal
    require(isActive == true, "O contrato nao esta mais ativo"); // Verifica se o contrato está ativo
    require(participants[msg.sender] == 0, "Este endereco ja participa do contrato"); // Verifica se o endereço do usuário ainda não está participando do contrato
    participants[msg.sender] = msg.value; // Adiciona o endereço do usuário e o valor pago
    users += 1; // Adiciona um usuário 
}

// Permite que o proprietário do contrato ajuste o saldo de um usuário
    function changeBalance(address _mudanca, uint _value, string memory oper) public {
        require(msg.sender == owner, "Not owner"); // Verifica se o remetente da transação é o dono do contrato
        require(keccak256(bytes(oper)) == keccak256(bytes("sub")) || keccak256(bytes(oper)) == keccak256(bytes("plus")), "sub or plus"); // Verifica se a operação a ser realizada é uma subtração ou adição
        if (keccak256(bytes(oper)) == keccak256(bytes("sub"))) { // Caso a operação seja uma subtração
            participants[_mudanca] -= _value;
        } else if (keccak256(bytes(oper)) == keccak256(bytes("plus"))) { // Caso a operação seja uma adição
            participants[_mudanca] += _value;
        }
         participants[_mudanca] = 0; // Define o saldo do usuário como zero
         
    }
    
// Retorna o saldo atual do contrato
    function getBalance() public view returns (uint){
        return address(this).balance; 
    }
}