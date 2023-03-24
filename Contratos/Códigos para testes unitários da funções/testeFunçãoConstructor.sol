//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Definindo a versão do Solidity e a licença do contrato

import "remix_tests.sol"; // Importando a biblioteca Remix Tests
import "contracts/cooverContract.sol"; // Importando o contrato cooverContract

contract constructorTest { // Define um novo contrato chamado constructorTest

cooverContract contrato; // Declara uma variável do tipo cooverContract
address[]  integrantes; // Declara um array de endereços chamado integrantes
uint[]  imei; // Declara um array de uint chamado imei

function beforeAll() public { // Define uma função chamada beforeAll, que será executada antes de todos os testes
    integrantes = new address[](3); // Inicializa o array integrantes com 3 elementos
    integrantes[0] = address(this); // Define o primeiro elemento do array como o endereço do contrato atual
    integrantes[1] = address(0x123); // Define o segundo elemento do array como o endereço 0x123
    integrantes[2] = address(0x456); // Define o terceiro elemento do array como o endereço 0x456
    
    imei = new uint[](3); // Inicializa o array imei com 3 elementos
    imei[0] = 12345; // Define o primeiro elemento do array como 12345
    imei[1] = 67890; // Define o segundo elemento do array como 67890
    imei[2] = 24680; // Define o terceiro elemento do array como 24680
    
    contrato = new cooverContract(integrantes, imei); // Cria uma nova instância do contrato cooverContract passando o array integrantes e o array imei como argumentos e atribui à variável contrato
}

function testConstructor() public { // Define uma função chamada testConstructor, que será usada para testar a criação do contrato
    //Verifica se o contrato foi criado com sucesso
    Assert.equal(contrato.partContrato(), true, "Contrato nao criado com sucesso"); // Chama a função partContrato do contrato cooverContract e verifica se o valor retornado é verdadeiro. Se não for, exibe a mensagem "Contrato nao criado com sucesso"
}
}