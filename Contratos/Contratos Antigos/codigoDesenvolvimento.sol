//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contrato inteligente
contract MeuContrato {

    // Armazena a quantidade de usuários atualmente no projeto
    uint public quantUsuario;

    // Armazena a data de validade do contrato
    uint public dataValidade;

    // Armazena a quantidade mínima e máxima de usuários permitida no projeto
    uint public minPessoas;
    uint public maxPessoas;

    uint public carteiraPrincipal; // Carteira principal do contrato

    // Armazena a lista de usuários que aceitaram o novo termo
    mapping(address => bool) public termoAceito;

    // Armazena a lista de carteiras de usuários
    Carteira[] public carteira;

    // Estrutura para armazenar a carteira de um usuário
    struct Carteira {
        address carteiraUsuario;
        uint saldo;
        uint valorCelular;
    }


    // Modificador que permite apenas que o proprietário do contrato execute a função
    modifier onlyOwner() {
        require(msg.sender == owner, "Somente o proprietario do contrato pode executar esta funcao.");
        _;
    }

    // Endereço do proprietário do contrato
    address owner;

    // Construtor do contrato que define a quantidade mínima e máxima de usuários e a data de validade
    constructor(uint _minPessoas, uint _maxPessoas, uint _dataValidade) {
        owner = msg.sender;
        minPessoas = _minPessoas;
        maxPessoas = _maxPessoas;
        dataValidade = _dataValidade;
    }

    // Adiciona um novo usuário ao projeto
    // USER STORY - 2 (COOVER ADICIONA UM NOVO USUÁRIO AO CONTRATO)

     // adiciona um novo usuário ao contrato
     // address - tem que ser o hash da carteira
    function adicionarUsuario(address usuario) public onlyOwner {
        // Verifica se o contrato está ativo
        require(viabilidadeContrato() == 1, "O contrato  esta ativo.");

        // Verifica se o usuário já está na lista de carteiras
        for (uint i = 0; i < carteira.length; i++) {
            require(carteira[i].carteiraUsuario != usuario, "O usuario ja esta na lista de carteiras.");
        }

        // Adiciona o usuário à lista de carteiras
        carteira.push(Carteira(usuario));
     
        if(quantUsuario > minPessoas && quantUsuario < maxPessoas){
            // Atualiza o número de usuários
            quantUsuario++;
        }
       
    }


    // Verifica a viabilidade do contrato (FAZER USER STORY - vai ser um teste da user story 1)
    function viabilidadeContrato() public view returns (uint) {
        if (quantUsuario >= minPessoas && block.timestamp <= dataValidade && quantUsuario <= maxPessoas) {
            return 1; // Contrato Ativo
        } else if (quantUsuario < minPessoas && block.timestamp <= dataValidade) {
            return 2; // Contrato em Progresso
        } else if (block.timestamp > dataValidade && quantUsuario < minPessoas) {
            return 3; // Contrato Inativo
        } else {
            revert("Erro ao verificar o contrato");
        }
    }

// O valor que o usuário vai pagar para entrar no seguro (ADICIONAR COMO CRITÉRIO - USER STORY 1)
    function cobrarValor(uint valor) public {
        
        valor = 10;

        // Verifica se o contrato está ativo
        require(viabilidadeContrato() == 1, "O contrato  esta ativo.");
    
        // Calcula o valor total a ser cobrado
        uint valorTotal = valor * quantUsuario;
        // Calcula a comissão do dono do contrato
        uint comissao = (valorTotal * 2) / 100;

        // Verifica se o valor total é compatível com o saldo da carteira principal
        require(carteiraPrincipal >= comissao, "Saldo insuficiente na carteira principal.");

        // Divide o valor total entre os usuários do contrato
        uint valorPorUsuario = (valorTotal - comissao) / quantUsuario;
        // Cobre o valor de cada usuário
        for (uint i = 0; i < carteira.length; i++) {
            carteira[i].saldo -= valorPorUsuario;
        }
        // Transfere a comissão para o dono do contrato
        for (uint i = 0; i < carteira.length; i++) {
            if (carteira[i].carteiraUsuario == owner) {
                carteira[i].saldo += comissao;
                break;
            }
        }
        carteiraPrincipal -= comissao;

    }


    // Função para remover um usuário do projeto ( Ligação indireta com a user story 4)
    function removerUsuario(address usuario) public onlyOwner {
        // Verifica cada carteira do projeto
        for (uint i = 0; i < carteira.length; i++) {
            // Verifica se a carteira do usuário corresponde ao endereço fornecido
            if (carteira[i].carteiraUsuario == usuario) {
                // Remove o usuário da lista de carteiras
                delete carteira[i];
                // Atualiza o número de usuários
                quantUsuario--;
                // Sai do loop
                break;
            }
        }
    }


    // Função para renovar o contrato (FAZER USER STORY)
    function renovarContrato(uint _novaDataValidade) public onlyOwner {
        // Verifica se a nova data de validade é no futuro
        require(_novaDataValidade > block.timestamp, "A nova data de validade deve ser no futuro.");

        // Cria um array para armazenar os índices dos usuários que não aceitaram o novo termo
        uint[] memory indicesRemover = new uint[](quantUsuario);
        uint quantRemover = 0;

        // Verifica se cada usuário aceitou o novo termo, adicionando o índice à lista de remoção, caso contrário
        for (uint i = 0; i < quantUsuario; i++) {
            if (!termoAceito[carteira[i].carteiraUsuario]) {
                indicesRemover[quantRemover] = i;
                quantRemover++;
            }
        }

        // Remove os usuários que não aceitaram o novo termo
        for (uint i = 0; i < quantRemover; i++) {
            removerUsuario(carteira[indicesRemover[i]].carteiraUsuario);
        }

        // Verifica se a quantidade de usuários é compatível com o mínimo e o máximo definidos no contrato
        require(quantUsuario >= minPessoas && quantUsuario <= maxPessoas, "A quantidade de usuarios nao e compativel com o minimo e o maximo definidos no contrato.");
        
        // Define a nova data de validade
        dataValidade = _novaDataValidade;
    }


    // pedir uma Indenização (USER STORY 3) transferencia de fundos (USER STORY 4)
    function pedirIndenizacao(uint valor) public {

        // Verifica se o contrato está ativo
        require(viabilidadeContrato() == 1, "O contrato  esta ativo.");

        // Verifica se o usuário está na lista de carteiras
        for (uint i = 0; i < carteira.length; i++) {

            if (carteira[i].carteiraUsuario == msg.sender) {
                
                // Verifica se o usuário tem saldo suficiente
                require(carteira[i].saldo >= valor, "O usuario nao tem saldo suficiente.");

                // Verifica se o valor solicitado é menor ou igual ao valor do celular do usuário
                require(valor <= carteira[i].valorCelular, "O valor solicitado e maior que o valor do celular do usuario.");

                // Adiciona o valor ao saldo do usuário
                carteira[i].saldo -= valor;
                break;
            }
        }
    }


    // Função para receber o pagamento de um usuário (FAZER USER STORY)
    function receberPagamento(uint valor) public onlyOwner {
        // Verifica se o contrato está ativo
        require(viabilidadeContrato() == 1, "O contrato  esta ativo.");

        // Verifica se o usuário está na lista de carteiras
        for (uint i = 0; i < carteira.length; i++) {
             // Adiciona o valor à carteira principal
            carteiraPrincipal += valor;
        }
    }


    // Reposição de reserva de risco (FAZER USER STORY)
    function reposicaoReservaRisco(uint valor) public onlyOwner {
        // Verifica se o contrato está ativo
        require(viabilidadeContrato() == 1, "O contrato  esta ativo.");

        // Verifica se o valor é menor ou igual ao saldo da carteira principal
        require(valor <= carteiraPrincipal, "O valor e maior que o saldo da carteira principal.");

        // Adiciona o valor à carteira principal
        carteiraPrincipal -= valor;
    }
}
