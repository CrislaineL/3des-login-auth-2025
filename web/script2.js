function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

async function fetchPosts() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Por favor, faça login para acessar o conteúdo.');
    window.location.href = 'index.html';
    return;
  }

  // Decodifica o token para pegar nome e avatar
  let userData = {};
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    userData = {
      name: payload.name,
      avatar: payload.avatar
    };

    renderUserHeader(userData); // Renderiza o cabeçalho
  } catch (err) {
    alert("Erro ao processar o token. Faça login novamente.");
    logout();
    return;
  }

  try {
    const res = await fetch('http://localhost:4000/posts', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
      throw new Error('Falha na autenticação ou no carregamento dos posts.');
    }

    const posts = await res.json();
    renderPosts(posts);
  } catch (error) {
    alert('Erro: ' + error.message);
    logout();
  }
}

// Renderiza o cabeçalho com nome, avatar e botão sair
function renderUserHeader(userData) {
  const header = document.getElementById('user-header');
  header.innerHTML = `
    <div class="header-left">
      <img src="${userData.avatar}" alt="Avatar" class="header-avatar">
      <span class="header-name">${userData.name}</span>
    </div>
    <button class="logout-btn" onclick="logout()">Sair</button>
  `;
}

// Renderiza os posts
function renderPosts(posts) {
  const container = document.getElementById('posts-container');
  container.innerHTML = '';

  posts.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';

    div.innerHTML = `
      <h2>${post.title}</h2>
      <p><strong>Data:</strong> ${post.date}</p>
      <p>${post.summary}</p>
      <p><strong>Visualizações:</strong> ${post.views} | <strong>Curtidas:</strong> ${post.likes}</p>
    `;

    container.appendChild(div);
  });
}

// Inicia carregamento ao abrir a página
fetchPosts();
