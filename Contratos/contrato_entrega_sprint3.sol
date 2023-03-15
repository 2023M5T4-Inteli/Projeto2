//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract cooverContract{

    //Declarando as variáveis utilizadas no código.

    address dono; //Dono do contrato
    mapping (address => uint) public partValor; // Relaciona a carteira com o saldo
    mapping (address => uint) public partImei; // Relaciona a carteira com o IMEI do celular
    mapping (address => uint256) public pedidos; //pedidos dos contratantes
    bool public partContrato; // Verifica se o contrato está ativo ou inativo
    uint public usuarios; // Usado para verificar a quantidade de pessoas dentro do contrato
    uint public saldoContrato; // Saldo do contrato
    uint public totalContrato; // Total dentro do contrato

    // Garante que o msg sender é o dono do contrato antes de realizar as funções
    modifier msgsender(){
        require(msg.sender == dono); _;
    }

    // Constructor é uma espécie de função que roda apenas no deploy do contrato
    constructor( address[] memory integrantes, uint[] memory imei ) {
        for(uint i = 0; i<integrantes.length; i++){
            partImei[integrantes[i]] = imei[i]; // Adiciona o IMEI para cada participante
        }
        dono = msg.sender; // Atribui o msg sender como o dono do contrato
        partContrato = true; // Ativa o contrato
    }


    // Função responsável pela entrada ($$) de um participante no contrato
    
    function pagamentoInicial() public payable{
        partValor[msg.sender] += msg.value; // Adiciona o valor ao saldo do participante      
    }

    // Função para adicionar um usuário a lista númerica da quantidade de usuário dentro do contrato
    
    function entrar() public payable {
        require(partContrato == true, "Contrato inativo"); // Verifica se o contrato está ativo
        require(partImei[msg.sender] == 0, "Ja participante"); // Verifica se o participante já está na lista
        partImei[msg.sender] = msg.value; // Adiciona o valor do pagamento como IMEI do celular
        usuarios += 1; // Adiciona um usuário
    }

    // Responsável por verificar o saldo de uma carteira

    function obterSaldo() public view returns (uint) {
        return partValor[msg.sender]; // Retorna o saldo
    }

   // Função responsável por repor a reserva financeira do contato 
   
    function reposicaoReserva(address usuario) public payable{
        require(totalContrato == 0, "A reserva do contrato precisa ser reposta"); // Verifica se a reserva está com valor igual a 0 
        saldoContrato = partValor[usuario]; // Atribui o valor da carteira do usuário como saldo do contrato
        totalContrato = msg.value; // Atribui o valor da mensagem como total do contrato

    }

    // Mostra o saldo contido dentro do contrato
    
    function saldo_Contrato() public view returns (uint) {
        return address(this).balance; // Retorna o saldo do contrato
    }

    // Mudança de saldo de acordo com a indenização

    function modificarSaldo(address _mudanca, uint _value, string memory oper) public msgsender {
        require(keccak256(bytes(oper)) == keccak256(bytes("sub")) || keccak256(bytes(oper)) == keccak256(bytes("plus")), "so sub ou plus"); // Verifica se a operação a ser realizada é uma subtração ou adição
        if (keccak256(bytes(oper)) == keccak256(bytes("sub"))) { // Caso a operação seja uma subtração
            require(partImei[_mudanca] >= _value, "Sem saldo suficiente");
            partImei[_mudanca] -= _value;
            payable(dono).transfer(_value);

        } else if (keccak256(bytes(oper)) == keccak256(bytes("plus"))) { // Caso a operação seja uma adição
            partImei[_mudanca] += _value;
        }
    }

    //Função para que o usuário peça uma indenização
    function pedirIndenizacao(uint256 quantidade) public{
        require(quantidade > 0, "Valor invalido"); //garante que é um valor valido
        pedidos[msg.sender] += quantidade;
    }

    //Função para que um administrador possa aceitar um pedido de indenização
    function aceitarIndenizacao(address contratantes) public {
        payable(contratantes).transfer(pedidos[contratantes]); //
        pedidos[contratantes] = 0;
}
    
}