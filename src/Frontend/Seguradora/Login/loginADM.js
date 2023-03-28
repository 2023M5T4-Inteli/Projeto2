// Adiciona um evento de clique no elemento com id "voltar"
document.getElementById('voltar').addEventListener('click', async () => {
    window.location.href = '../../index.html';
});

// Função que é chamada quando o usuário clica no botão "Voltar"
function voltarInicioPlataforma() {
    window.location.href = '../../index.html';
}


// Verificação de Login
function fazerLogin() {
    alert('Fazendo login...')
    const email = document.getElementById('email').value;
  
    fetch('http://localhost:3081/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({ email })
    })
    .then((response) => {
      if (response.ok) {
        window.location.href = './verificacao.html';
      } else {
        throw new Error('Erro ao fazer login.');
      }
    })
    .catch((error) => {
      alert(error.message);
    });
}


  