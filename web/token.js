async function verificarToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Token não encontrado. Faça login novamente.");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:4000/posts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if (res.status === 200) {
      window.location.href = "home.html";
    } else {
      throw new Error("Token inválido");
    }
  } catch (error) {
    alert("Token inválido ou expirado. Faça login novamente.");
    localStorage.removeItem("token");
    window.location.href = "index.html";
  }
}

verificarToken();