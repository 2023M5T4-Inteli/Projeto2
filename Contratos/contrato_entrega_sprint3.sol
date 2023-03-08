//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract cooverContract{

    //Declarando as variáveis utilizadas no código.
    address dono; //Dono do contrato
    mapping (address => uint) public partValor; 
    mapping (address => uint) public partImei;
    bool public partContrato;
    uint public usuarios;

    //Garante que o msg sender é o dono do contrato antes de realizar as funções
    modifier msgsender(){
        require(msg.sender == dono); _;
    }

    //Constructor é uma espécie de função que roda apenas no deploy do contrato
    constructor( address[] memory integrantes, uint[] memory imei ) {
        for(uint i = 0; i<integrantes.length; i++){
            partImei[integrantes[i]] = imei[i];
        }
        dono = msg.sender;
        partContrato = true;
    }


    //Função responsável pela entrada de um participante no contrato
    function pagamentoInicial() public payable{
    partValor[msg.sender] += msg.value;      
    }

    function join() public payable {
        require(partContrato == true, "Contrato inativo");
        require(partImei[msg.sender] == 0, "Ja participante");
        partImei[msg.sender] = msg.value;
        usuarios += 1;
    }
}