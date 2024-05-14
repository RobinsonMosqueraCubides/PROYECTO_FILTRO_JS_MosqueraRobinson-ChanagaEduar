document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://api.spacexdata.com/v4/rockets';
    let rocketsData = []; // Almacenar los datos de los cohetes
    let currentRocketIndex = 0; // Índice del cohete actual

    // Obtener la información de los cohetes desde la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            rocketsData = data;
            displayCurrentRocketInfo(); // Mostrar la información del primer cohete al inicio

            // Botón para mostrar el cohete anterior
            document.getElementById('prevRocketBtn').addEventListener('click', function() {
                currentRocketIndex = (currentRocketIndex - 1 + rocketsData.length) % rocketsData.length;
                displayCurrentRocketInfo();
            });

            // Botón para mostrar el siguiente cohete
            document.getElementById('nextRocketBtn').addEventListener('click', function() {
                currentRocketIndex = (currentRocketIndex + 1) % rocketsData.length;
                displayCurrentRocketInfo();
            });
        })
        .catch(error => {
            console.error('Error al obtener la información de los cohetes:', error);
        });

    // Función para mostrar la información del cohete actual
    function displayCurrentRocketInfo() {
        const rocket = rocketsData[currentRocketIndex];
        if (rocket) {
            document.getElementById('rocketName').textContent = rocket.name;
            document.getElementById('rocketDescription').textContent = rocket.description;

            // Mostrar dimensiones
            const dimensionsDiv = document.getElementById('rocketDimensions');
            dimensionsDiv.innerHTML = `
                <p>Altura: ${rocket.height.meters} metros (${rocket.height.feet} pies)</p>
                <p>Diámetro: ${rocket.diameter.meters} metros (${rocket.diameter.feet} pies)</p>
                <p>Masa: ${rocket.mass.kg} kg (${rocket.mass.lb} lb)</p>
            `;

            // Mostrar pesos de carga
            const payloadWeightsUl = document.getElementById('payloadWeights');
            payloadWeightsUl.innerHTML = '';
            rocket.payload_weights.forEach(weight => {
                const li = document.createElement('li');
                li.textContent = `${weight.name}: ${weight.kg} kg (${weight.lb} lb)`;
                payloadWeightsUl.appendChild(li);
            });

            // Mostrar primera etapa
            const firstStageDiv = document.getElementById('firstStage');
            firstStageDiv.innerHTML = `
                <p>Empuje al Nivel del Mar: ${rocket.first_stage.thrust_sea_level.kN} kN (${rocket.first_stage.thrust_sea_level.lbf} lbf)</p>
                <p>Empuje en el Vacío: ${rocket.first_stage.thrust_vacuum.kN} kN (${rocket.first_stage.thrust_vacuum.lbf} lbf)</p>
                <p>Reutilizable: ${rocket.first_stage.reusable ? 'Sí' : 'No'}</p>
                <p>Número de Motores: ${rocket.first_stage.engines}</p>
                <p>Cantidad de Combustible (toneladas): ${rocket.first_stage.fuel_amount_tons}</p>
                <p>Tiempo de Quema (segundos): ${rocket.first_stage.burn_time_sec}</p>
            `;

            // Mostrar segunda etapa
            const secondStageDiv = document.getElementById('secondStage');
            secondStageDiv.innerHTML = `
                <p>Empuje: ${rocket.second_stage.thrust.kN} kN (${rocket.second_stage.thrust.lbf} lbf)</p>
                <p>Reutilizable: ${rocket.second_stage.reusable ? 'Sí' : 'No'}</p>
                <p>Número de Motores: ${rocket.second_stage.engines}</p>
                <p>Cantidad de Combustible (toneladas): ${rocket.second_stage.fuel_amount_tons}</p>
                <p>Tiempo de Quema (segundos): ${rocket.second_stage.burn_time_sec}</p>
            `;

            // Mostrar motores
            const enginesDiv = document.getElementById('rocketEngines');
            enginesDiv.innerHTML = `
                <p>ISP al Nivel del Mar: ${rocket.engines.isp.sea_level}</p>
                <p>ISP en el Vacío: ${rocket.engines.isp.vacuum}</p>
                <p>Empuje al Nivel del Mar: ${rocket.engines.thrust_sea_level.kN} kN (${rocket.engines.thrust_sea_level.lbf} lbf)</p>
                <p>Empuje en el Vacío: ${rocket.engines.thrust_vacuum.kN} kN (${rocket.engines.thrust_vacuum.lbf} lbf)</p>
                <p>Número de Motores: ${rocket.engines.number}</p>
                <p>Tipo de Motor: ${rocket.engines.type}</p>
                <p>Versión: ${rocket.engines.version}</p>
                <p>Diseño: ${rocket.engines.layout}</p>
                <p>Pérdida Máxima del Motor: ${rocket.engines.engine_loss_max}</p>
                <p>Combustible 1: ${rocket.engines.propellant_1}</p>
                <p>Combustible 2: ${rocket.engines.propellant_2}</p>
                <p>Empuje a Peso: ${rocket.engines.thrust_to_weight}</p>
            `;

            

            // Mostrar imágenes
            const imagesDiv = document.getElementById('rocketImages');
            imagesDiv.innerHTML = '';
            rocket.flickr_images.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = 'Rocket Image';
                img.style.width = '200px'; // Estilo opcional para el tamaño de la imagen
                imagesDiv.appendChild(img);
            });
        }
    }
});
