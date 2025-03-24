const adminEmail = "helsingrpp2@gmail.com";

// Simula cargar datos JSON
async function loadData() {
  const response = await fetch("data.json");
  return response.json();
}

// Simula guardar datos en JSON
function saveData(data) {
  console.log("Datos guardados (simulado):", data);
}

// Reservar juego
document.getElementById("reservationForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;

  const data = await loadData();
  data.reservations.push({ email, date: new Date().toISOString() });
  saveData(data);

  alert("Reserva realizada con éxito.");

  if (email === adminEmail) {
    document.getElementById("updates").style.display = "block";
    alert("Acceso de administrador activado.");
  }
});

// Añadir comentarios
document.getElementById("commentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const comment = document.getElementById("commentInput").value;

  const data = await loadData();
  data.comments.push({ comment, date: new Date().toISOString() });
  saveData(data);

  const commentsList = document.getElementById("commentsList");
  const newComment = document.createElement("p");
  newComment.textContent = comment;
  commentsList.appendChild(newComment);

  document.getElementById("commentInput").value = "";
  alert("Comentario publicado.");
});

// Publicar actualizaciones
document.getElementById("postUpdate").addEventListener("click", async () => {
  const content = document.getElementById("updateContent").value;
  const data = await loadData();

  data.updates.push({ content, date: new Date().toISOString() });
  saveData(data);

  const updatesList = document.getElementById("updatesList");
  const newUpdate = document.createElement("p");
  newUpdate.textContent = content;
  updatesList.appendChild(newUpdate);

  document.getElementById("updateContent").value = "";
  alert("Actualización publicada.");
});
