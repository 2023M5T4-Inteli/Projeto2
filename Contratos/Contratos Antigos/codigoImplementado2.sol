//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract cooverContract{
 
    address owner;//Endereço do dono do contrato
    uint public monthly; //Valor mensal do seguro
    uint public users; //Numero total de adeptos ao contrato
    bool public isActive; //Contrato está ativo ou inativo (true e false)
    uint public coverage; //Valor de cobertura do objeto assegurado
    uint public balance; //Saldo da carteira 
    mapping (address => uint) public participants; //endereço dos usuarios e o preço pago por eles

    //Constructor é uma função que roda apenas uma vez na hora do deploy
    constructor(){
        users = 0;
        isActive = true;
        owner = msg.sender; //Garante que aquele que fez o deploy é o dono do contrato
    }

    function join() public payable {
    require(msg.value == monthly, "O valor do pagamento esta errado");
    require(isActive == true, "O contrato nao esta mais ativo");
    require(participants[msg.sender] == 0, "Este endereco ja participa do contrato");
    participants[msg.sender] = msg.value;
    users += 1;
}

    function changeBalance(address _mudanca, uint _value, string memory oper) public {
        require(msg.sender == owner, "Not owner");
        require(keccak256(bytes(oper)) == keccak256(bytes("sub")) || keccak256(bytes(oper)) == keccak256(bytes("plus")), "sob or plus");
        if (keccak256(bytes(oper)) == keccak256(bytes("sub"))) {
            participants[_mudanca] -= _value;
        } else if (keccak256(bytes(oper)) == keccak256(bytes("plus"))) {
            participants[_mudanca] += _value;
        }
         participants[_mudanca] = 0;
         
    }
    
    function getBalance() public view returns (uint){
        return address(this).balance;
    }

}

 