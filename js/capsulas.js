document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://api.spacexdata.com/v4/capsules';
    let capsulesData = []; // Almacenar los datos de todas las cápsulas
    let currentCapsuleIndex = 0; // Índice de la cápsula actual
    
    // Función para mostrar la información de la cápsula actual
    function displayCurrentCapsuleInfo() {
        const capsule = capsulesData[currentCapsuleIndex];
        const capsuleInfoDiv = document.getElementById('capsuleInfo');
        const launchInfoDiv = document.getElementById('launchInfo'); // Nuevo div para los lanzamientos

        if (capsule) {
            capsuleInfoDiv.innerHTML = `
                <p><strong>Reutilización:</strong> ${capsule.reuse_count}</p>
                <p><strong>Aterrizajes en agua:</strong> ${capsule.water_landings}</p>
                <p><strong>Aterrizajes en tierra:</strong> ${capsule.land_landings}</p>
                <p><strong>Última actualización:</strong> ${capsule.last_update}</p>
                <p><strong>Estado:</strong> ${capsule.status}</p>
                <p><strong>Tipo:</strong> ${capsule.type}</p>
            `;

            // Limpiar el contenido anterior del div de lanzamientos
            launchInfoDiv.innerHTML = '';

            // Verificar si la cápsula tiene lanzamientos
            if (capsule.launches.length > 0) {
                // Obtener información de todos los lanzamientos de la cápsula
                capsule.launches.forEach(launchId => {
                    const launchUrl = `https://api.spacexdata.com/v4/launches/${launchId}`;

                    fetch(launchUrl)
                        .then(response => response.json())
                        .then(data => {
                            const launchName = data.name;
                            const launchImageSmall = data.links.patch.small;
                            const staticFireDateUtc = data.static_fire_date_utc;
                            const launchinfo = data.details;
                            const staticFireDateUtc2 = staticFireDateUtc ? staticFireDateUtc.slice(0,10) : 'Desconocida';

                            // Agregar la información de cada lanzamiento al div de lanzamientos
                            launchInfoDiv.innerHTML += `
                                <h2>Lanzamiento: ${launchName}</h2>
                                <p>Fecha de prueba estática: ${staticFireDateUtc2}</p>
                                <p>Detalle: ${launchinfo}</p>
                                <img src="${launchImageSmall}" alt="${launchName} Imagen" />
                            `;
                        })
                        .catch(error => {
                            console.error('Error al obtener la información del lanzamiento:', error);
                        });
                });
            } else {
                // Si la cápsula no tiene lanzamientos, mostrar un mensaje en lugar de la información del lanzamiento
                launchInfoDiv.innerHTML = '<p>Esta cápsula no tiene lanzamientos.</p>';
            }
        } else {
            capsuleInfoDiv.innerHTML = '<p>La información de la cápsula no está disponible.</p>';
        }
    }

    // Obtener la información de todas las cápsulas desde la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            capsulesData = data;
            displayCurrentCapsuleInfo(); // Mostrar la información de la primera cápsula al inicio
            // Botón para mostrar la cápsula anterior
            document.getElementById('prevBtn').addEventListener('click', function() {
                currentCapsuleIndex = (currentCapsuleIndex - 1 + capsulesData.length) % capsulesData.length;
                displayCurrentCapsuleInfo();
            });

            // Botón para mostrar la siguiente cápsula
            document.getElementById('nextBtn').addEventListener('click', function() {
                currentCapsuleIndex = (currentCapsuleIndex + 1) % capsulesData.length;
                displayCurrentCapsuleInfo();
            });
        })
        .catch(error => {
            console.error('Error al obtener la información:', error);
        });
});
