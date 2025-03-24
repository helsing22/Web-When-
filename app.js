// Verifica si el usuario es administrador
const adminEmail = "helsingrpp2@gmail.com";

// Función para cargar el archivo JSON
async function loadData() {
  const response = await fetch("data.json");
  return response.json();
}

// Función para guardar cambios en el archivo JSON (simulado para frontend)
function saveData(data) {
  console.log("Datos guardados (simulado):", data);
}

// Lógica del formulario de reserva
document.getElementById("reservationForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;

  const data = await loadData();
  data.reservations.push({ email, date: new Date().toISOString() });
  saveData(data);

  alert("Reserva realizada con éxito.");
});

// Lógica para publicaciones de actualizaciones
const updateContent = document.getElementById("updateContent");
const uploadImage = document.getElementById("uploadImage");
const updatesSection = document.getElementById("updates");
const postUpdateBtn = document.getElementById("postUpdate");

// Simula el inicio de sesión como administrador
document.getElementById("reservationForm").addEventListener("submit", async (e) => {
  const email = document.getElementById("emailInput").value;
  if (email === adminEmail) {
    updatesSection.style.display = "block";
    alert("Acceso de administrador activado.");
  }
});

// Publicar actualizaciones
postUpdateBtn.addEventListener("click", async () => {
  const content = updateContent.value;
  const file = uploadImage.files[0];
  const data = await loadData();

  if (content || file) {
    data.updates.push({ content, date: new Date().toISOString() });
    saveData(data);
    alert("Actualización publicada con éxito.");
  } else {
    alert("Por favor, escribe algo o sube una imagen.");
  }
});
// Generar partículas arcoiris
function createParticles() {
  const body = document.body;

  for (let i = 0; i < 100; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.opacity = Math.random();
    body.appendChild(particle);
  }
}

// Llamar a la función al cargar la página
window.onload = () => {
  createParticles();
};
