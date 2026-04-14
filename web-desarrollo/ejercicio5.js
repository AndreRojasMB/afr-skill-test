// API pública: https://jsonplaceholder.typicode.com/users/1
// Responde con un objeto que incluye, entre otros campos: { id: 1, name: "Leanne Graham", ... }

async function obtenerUsuario() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  const data = await response.json();

  console.log("Usuario: " + data.name);
}

obtenerUsuario();