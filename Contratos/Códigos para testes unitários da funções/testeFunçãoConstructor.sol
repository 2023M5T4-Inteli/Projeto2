//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "remix_tests.sol";
import "contracts/cooverContract.sol";

contract cooverContractTest {
    
    cooverContract contrato;
    address[]  integrantes;
    uint[]  imei;
    
    function beforeAll() public {
        integrantes = new address[](3);
        integrantes[0] = address(this);
        integrantes[1] = address(0x123);
        integrantes[2] = address(0x456);
        
        imei = new uint[](3);
        imei[0] = 12345;
        imei[1] = 67890;
        imei[2] = 24680;
        
        contrato = new cooverContract(integrantes, imei);
    }
    
    function testConstructor() public {
        //Verifica se o contrato foi criado com sucesso
        Assert.equal(contrato.partContrato(), true, "Contrato nao criado");
    }
}