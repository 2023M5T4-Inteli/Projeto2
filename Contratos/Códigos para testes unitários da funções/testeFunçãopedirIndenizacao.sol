// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importando a biblioteca "remix_tests.sol" para testar o contrato
import "remix_tests.sol";

// Importando o contrato "cooverContract" que será testado
import "contracts/cooverContract.sol";

// Declarando o contrato de teste e a variável 
contract cooverContractTest {
    cooverContract contrato;
    
    // Função executada antes de cada teste
function beforeEach() public {
    // Criando um array com um único endereço que será utilizado como participante do contrato
    address[] memory integrantes = new address[](1);
        // Criando um array com um único valor que será utilizado como IMEI do celular do participante
    uint[] memory imei = new uint[](1);
    // Atribuindo o endereço do contrato ao primeiro elemento do array "integrantes"
    integrantes[0] = address(this);
    // Atribuindo um valor ao primeiro elemento do array "imei"
    imei[0] = 123456;
    // Criando um novo contrato "cooverContract" com o endereço e valor definidos acima
    contrato = new cooverContract(integrantes, imei);
    }

    // Função de teste que verifica se um pedido de indenização é registrado corretamente
function testePedirIndenizacao() public {
    // Definindo um valor para a quantidade de indenização
    uint256 quantidade = 500;
    // Fazendo um pedido de indenização para o contrato
    contrato.pedirIndenizacao(quantidade);
    // Verificando se o pedido de indenização foi registrado corretamente
    Assert.equal(contrato.pedidos(address(this)), quantidade, "Pedido de indenizacao nao registrado corretamente");
    }
}