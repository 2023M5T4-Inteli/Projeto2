//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;  // Define a versão do Solidity e a licença do contrato

import "remix_tests.sol"; // Importando o módulo de teste do Remix
import "contracts/cooverContract.sol"; // Importando  o contrato cooverContract

contract cooverContractTest { // Definindo um novo contrato chamado cooverContractTest

    cooverContract contrato; // Instância do contrato a ser testado
    
    function beforeAll() public { // Definindo uma função chamada beforeAll, que será executada antes de todos os testes
        address[] memory integrantes = new address[](2); // Declara um array de endereços chamado integrantes com 2 elementos
        uint[] memory imei = new uint[](2);  // Declara um array de uint chamado imei com 2 elementos
        integrantes[0] = address(this); // Define o primeiro elemento do array como o endereço do contrato atual
        imei[0] = 123456789; // Define o primeiro elemento do array como 123456789
        integrantes[1] = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4; // Define o segundo elemento do array como o endereço 
        imei[1] = 987654321; // Define o segundo elemento do array como 987654321
        contrato = new cooverContract(integrantes, imei); // Cria uma nova instância do contrato
    }
    
    function saldo_Contrato_Deve_Retornar_Zero() public { // Define uma função chamada saldo_Contrato_Deve_Retornar_Zero para testar a função saldo_Contrato do contrato cooverContract
        uint balance = contrato.saldo_Contrato(); // Chama a função saldo_Contrato() do contrato
        Assert.equal(balance, 0, "O saldo do contrato deve ser zero"); //  Compara o valor retornado pela função saldo_Contrato com zero e exibe a mensagem "O saldo do contrato deve ser zero" se a comparação falhar
    }
}