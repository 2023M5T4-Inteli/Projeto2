document.getElementById('user').addEventListener('click', async () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Redirecionando...',
        text: 'Área do Usuário',
        showConfirmButton: false,
        timer: 2000
    }).then(() => {
        window.location.href = './Usuário/Login/loginUser.html';
    })
    
});

document.getElementById('seguradora').addEventListener('click', async () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Redirecionando...',
        text: 'Área da Seguradora',
        showConfirmButton: false,
        timer: 1500
    }).then(() => {
        window.location.href = './Seguradora/Login/loginADM.html';
    })
});