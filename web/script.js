async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value; 

    try {
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: email,
                psw: password
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); 
            window.location.href = 'token.html'; // página dos posts
        } else {
            alert('Email ou senha está incorreto'); 
        }
    } catch (error) {
        console.error('Erro ao Logar:', error);
        alert('Erro ao fazer login'); 
    }
}

document.getElementById('botao').addEventListener('click', function(event) {
    event.preventDefault(); // evita o envio padrão do form (se houver)
    login();
});
