//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "remix_tests.sol"; // Importa o módulo de teste do Remix
import "contracts/cooverContract.sol";

contract cooverContractTest {
    cooverContract contrato; // Instância do contrato a ser testado
    
    function beforeAll() public {
        address[] memory integrantes = new address[](2);
        uint[] memory imei = new uint[](2);
        integrantes[0] = address(this);
        imei[0] = 123456789;
        integrantes[1] = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
        imei[1] = 987654321;
        contrato = new cooverContract(integrantes, imei); // Cria uma nova instância do contrato
    }
    
    function saldo_Contrato_Deve_Retornar_Zero() public {
        uint balance = contrato.saldo_Contrato(); // Chama a função saldo_Contrato() do contrato
        Assert.equal(balance, 0, "O saldo do contrato deve ser zero"); // Verifica se o saldo do contrato é igual a zero
    }
}