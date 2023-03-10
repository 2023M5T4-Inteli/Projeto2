//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract cooverContract{

    //Declarando as variáveis utilizadas no código.
    address dono; //Dono do contrato
    mapping (address => uint) public partValor; //Relaciona a carteira com o saldo
    mapping (address => uint) public partImei;
    bool public partContrato; 
    uint public usuarios; //Usado para verificar a quantidade de pessoas dentro do contrato
    uint public saldoContrato; // Saldo do contrato
    uint public totalContrato; //Total dentro do contrato
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

    //Utilizada para adicionar um usuário a lista númerica da quantidade de usuário dentro do contrato.
    function entrar() public payable {
        require(partContrato == true, "Contrato inativo");
        require(partImei[msg.sender] == 0, "Ja participante");
        partImei[msg.sender] = msg.value;
        usuarios += 1;
    }

    //Responsável por verificar o saldo de uma carteira
    function obterSaldo() public view returns (uint) {
        return partValor[msg.sender];
    }

   //Função responsável por repor a reserva financeira do contato 
    function reposicaoReserva(address usuario) public payable{
        require(totalContrato == 0, "A reserva do contrato precisa ser reposta");
        saldoContrato = partValor[usuario];
        totalContrato = msg.value;

    }

    //Mostra o saldo contido dentro do contrato
    function saldo_Contrato() public view returns (uint) {
        return address(this).balance; 
    }

    // mudança de saldo de acordo com a indenização.
    function modificarSaldo(address _mudanca, uint _value, string memory oper) public msgsender {
        require(keccak256(bytes(oper)) == keccak256(bytes("sub")) || keccak256(bytes(oper)) == keccak256(bytes("plus")), "so sub ou plus");

        if (keccak256(bytes(oper)) == keccak256(bytes("sub"))) {
            require(partImei[_mudanca] >= _value, "Sem saldo suficiente");
            partImei[_mudanca] -= _value;
            payable(dono).transfer(_value);

        } else if (keccak256(bytes(oper)) == keccak256(bytes("plus"))) {
            partImei[_mudanca] += _value;
        }
    }

    //Função responsável pela ação de solicitar indenização.
    function pedirIndenizacao(uint _value) public {
        require(partContrato == true, "Contrato inativo");
            partImei[msg.sender] -= _value;
            totalContrato -= _value;
            payable(msg.sender).transfer(_value);
}

}