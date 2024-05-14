function roc(){
let rocketsData; // Almacenar los datos de los cohetes
let currentRocketIndex = 0; // Índice del cohete actual
function getDataRockets(){
    const apiUrl = 'https://api.spacexdata.com/v4/rockets';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            rocketsData = data;
            displayCurrentRocketInfo(); // Mostrar la información del primer cohete al inicio            
        })
        .catch(error => {
            console.error('Error al obtener la información de los cohetes:', error);
        });
}
function displayCurrentRocketInfo(){
    const rocket = rocketsData[currentRocketIndex];

    //Mostrar titulo
    const title = document.getElementById('header__title');
    const h1 = document.createElement('h1');
    h1.textContent = rocket.name
    title.innerHTML='';
    title.appendChild(h1);
    console.log(rocket.name);

    //Mostrar description
    const description = document.getElementById('section__information__1');
    const h3 = document.createElement('h3');
    h3.textContent = rocket.description
    description.innerHTML='';
    description.appendChild(h3);
    console.log(rocket.description);
   
   // Mostrar imágenes
const imagesDiv = document.getElementById('section__image');
imagesDiv.innerHTML = '';
rocket.flickr_images.forEach(imageUrl => {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Rocket Image';
    img.referrerPolicy = 'no-referrer';
    img.style.width = '20vi'; // Estilo opcional para el tamaño de la imagen
    img.classList.add('imagenes-cohetes'); // Agregar la clase 'imagenes-cohetes'
    imagesDiv.appendChild(img);
});


    // Mostrar primera etapa
    const firstStageDiv = document.getElementById('information__table__1');
    firstStageDiv.innerHTML = `
        <h2>Primera etapa</h2>
        <p>Empuje al Nivel del Mar: ${rocket.first_stage.thrust_sea_level.kN} kN (${rocket.first_stage.thrust_sea_level.lbf} lbf)</p>
        <p>Empuje en el Vacío: ${rocket.first_stage.thrust_vacuum.kN} kN (${rocket.first_stage.thrust_vacuum.lbf} lbf)</p>
        <p>Reutilizable: ${rocket.first_stage.reusable ? 'Sí' : 'No'}</p>
        <p>Número de Motores: ${rocket.first_stage.engines}</p>
        <p>Cantidad de Combustible (toneladas): ${rocket.first_stage.fuel_amount_tons}</p>
        <p>Tiempo de Quema (segundos): ${rocket.first_stage.burn_time_sec}</p>
    `;

    // Mostrar segunda etapa
    const secondStageDiv = document.getElementById('information__table__2');
    secondStageDiv.innerHTML = `
    <h2>Segunda etapa</h2>
        <p>Empuje: ${rocket.second_stage.thrust.kN} kN (${rocket.second_stage.thrust.lbf} lbf)</p>
        <p>Reutilizable: ${rocket.second_stage.reusable ? 'Sí' : 'No'}</p>
        <p>Número de Motores: ${rocket.second_stage.engines}</p>
        <p>Cantidad de Combustible (toneladas): ${rocket.second_stage.fuel_amount_tons}</p>
        <p>Tiempo de Quema (segundos): ${rocket.second_stage.burn_time_sec}</p>
    `;

    // Mostrar dimensiones y peso de carga
    const dimensionsDiv = document.getElementById('description__item');
    dimensionsDiv.innerHTML = '';
    const tdv = document.createElement('div');
    tdv.innerHTML = `
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
   
    <h2>Dimensiones</h2>
        <p>Altura: ${rocket.height.meters} metros (${rocket.height.feet} pies)</p>
        <p>Diámetro: ${rocket.diameter.meters} metros (${rocket.diameter.feet} pies)</p>
        <p>Masa: ${rocket.mass.kg} kg (${rocket.mass.lb} lb)</p>
        <br>
        <br>
        <br>
    <h2>Peso de carga</h2>
    `;
    dimensionsDiv.appendChild(tdv);
    const payloadWeightsUl = document.getElementById('description__item');
    rocket.payload_weights.forEach(weight => {
        const li = document.createElement('li');
        li.textContent = `${weight.name}: ${weight.kg} kg (${weight.lb} lb)`;
        payloadWeightsUl.appendChild(li);
    });


    // Mostrar motores
    const enginesDiv = document.getElementById('information__2');
    enginesDiv.innerHTML = `
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <h2>Motores</h2>
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

    //creacion de botones para paginacion
    const pag = document.getElementById('paginacion');
    pag.innerHTML = '';
    for (let i = 0; i < rocketsData.length; i++) {
          const btn = document.createElement('button');
          btn.textContent = i+1;
          btn.className = 'btnPaginacion';
          pag.appendChild(btn);
    }
    const btnChange = document.querySelectorAll('.btnPaginacion');
    btnChange.forEach((e)=>{
        e.addEventListener('click',()=>{
            let pagina = parseInt(e.textContent);
            currentRocketIndex = pagina-1;
            getDataRockets();
        });
    });  
}
getDataRockets();

}
function capsule(){
    const apiUrl = 'https://api.spacexdata.com/v4/capsules';
    let capsulesData = []; // Almacenar los datos de todas las cápsulas
    let currentCapsuleIndex = 0; // Índice de la cápsula actual
    function getDataCapsules(){
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            capsulesData = data;
            displayCurrentCapsuleInfo(); // Mostrar la información de la primera cápsula al inicio
        })
        .catch(error => {
            console.error('Error al obtener la información:', error);
        });
        function displayCurrentCapsuleInfo(){
            const capsule = capsulesData[currentCapsuleIndex];
                //Mostrar titulo
            const title = document.getElementById('header__title');
            const h1 = document.createElement('h1');
            h1.textContent = capsule.serial
            title.innerHTML='';
            title.appendChild(h1);
            console.log(capsule.serial);
            // Verificar si la cápsula tiene lanzamientos
            if (capsule.launches.length > 0) {
                // Obtener información de todos los lanzamientos de la cápsula
                let launcher = document.getElementById('description__item');
                launcher.innerHTML='';
                let logo = document.getElementById('section__image');
                logo.innerHTML ='';
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
                            let tdv = document.createElement('div');
                            tdv.innerHTML =`
                            <h2>Lanzamiento: ${launchName}</h2>
                            <p>Fecha de prueba estática: ${staticFireDateUtc2}</p>
                            <p>Detalle: ${launchinfo}</p><br>`;
                            launcher.appendChild(tdv);
                            let tdv2 = document.createElement('div');
                            tdv2.innerHTML = `<img src="${launchImageSmall}" alt="${launchName} Imagen" width="280vi" />`;
                            logo.appendChild(tdv2);
                            console.log(data.flickr);
                            
                        
                        })
                        .catch(error => {
                            console.error('Error al obtener la información del lanzamiento:', error);
                        });
                });
            } else {
                // Si la cápsula no tiene lanzamientos, mostrar un mensaje en lugar de la información del lanzamiento
                let logo = document.getElementById('section__information__1');
                logo.innerHTML = '<h2>Esta cápsula no tiene lanzamientos.</h2>';
            }
            let capsuleInformation = document.getElementById('information__2');
            capsuleInformation.innerHTML = `
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <p><strong>Reutilización:</strong> ${capsule.reuse_count}</p>
            <p><strong>Aterrizajes en agua:</strong> ${capsule.water_landings}</p>
            <p><strong>Aterrizajes en tierra:</strong> ${capsule.land_landings}</p>
            <p><strong>Última actualización:</strong> ${capsule.last_update}</p>
            <p><strong>Estado:</strong> ${capsule.status}</p>
            <p><strong>Tipo:</strong> ${capsule.type}</p>
        `;
             //creacion de botones para paginacion
     const pag = document.getElementById('paginacion');
     pag.innerHTML = '';
     for (let i = 0; i < capsulesData.length; i++) {
           const btn = document.createElement('button');
           btn.textContent = i+1;
           btn.className = 'btnPaginacion';
           pag.appendChild(btn);
     }
     const btnChange = document.querySelectorAll('.btnPaginacion');
     btnChange.forEach((e)=>{
         e.addEventListener('click',()=>{
             let pagina = parseInt(e.textContent);
             currentCapsuleIndex = pagina-1;
             getDataCapsules();
         });
     });
        }  
    }

    getDataCapsules();
}
