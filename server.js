<script>
    const apiUrl = 'https://github.com/helsing22/Web-When-/blob/main/server.js'; // Cambia esto por la URL de tu API real

    // Obtener el total de reservas desde el backend
    async function fetchTotalReservations() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Error al obtener el total de reservas');
            }
            const data = await response.json();
            return data.totalReservations; // Asegúrate de que tu API devuelva un objeto con esta propiedad
        } catch (error) {
            console.error('Error al obtener el total de reservas:', error);
            return 0; // Retornar 0 en caso de error
        }
    }

    // Inicializar el contador desde el backend
    async function initializeCounter() {
        const totalReservations = await fetchTotalReservations();
        document.getElementById('counter').textContent = totalReservations;

        // Verificar si el usuario ya ha hecho una reserva
        const hasReserved = localStorage.getItem('hasReserved');

        // Si el usuario no ha reservado, agregar el evento de clic
        if (!hasReserved) {
            document.getElementById('reserveButton').addEventListener('click', async function(event) {
                event.preventDefault(); // Evitar el comportamiento por defecto del enlace

                // Actualizar el total de reservas en el backend
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ increment: 1 }) // Asegúrate de que tu API acepte este formato
                    });

                    if (!response.ok) {
                        throw new Error('Error al realizar la reserva');
                    }

                    const updatedData = await response.json();
                    document.getElementById('counter').textContent = updatedData.totalReservations;
                    localStorage.setItem('hasReserved', 'true'); // Marcar que el usuario ha reservado
                } catch (error) {
                    console.error('Error al realizar la reserva:', error);
                }
            });
        }
    }

    // Inicializar el contador al cargar la página
    window.onload = initializeCounter;
</script>
