function roc(){
    // Mostrar primera etapa
    const firstStageDiv = document.getElementById('todo');
    firstStageDiv.innerHTML = `
    <header class="header">
    <div id="header__title" class="header__title">
        <div class="load"></div>
    </div>
</header>
<main class="main">
    <nav class="nav__description">
        <div id="description__item" class="description__item">
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
        </div>
        <div class="description__buttom">
        </div>
    </nav>
    <section class="main__section">
        <article id="section__information__1" class="section__information__1">
            <div class="load" style="height: 150px;"></div>
        </article>
        <article class="section__information__container">
            <div id="section__information__2" class="section__information__2">
                <div>
                    <div class="load" style="height: 150px;"></div>
                </div>
                <div id="information__table__1" class="information__table__1">
                    <div class="load" style="height: 160px;"></div>
                </div>
            </div>

                <!--Imagenes-->
            <div id="section__image" class="section__image">
                <div class="load" style="height: 350px"></div>
            </div>


            <div class="section__information__3">
                <div id="yes">
                    <div class="load" style="height: 150px;"></div>
                </div>
                <div id="information__table__2" class="information__table__2">
                    <div class="load" style="height: 160px;"></div>
                </div>
            </div>
        </article>
        <footer class="footer">
            <ul>
                <li id="rockets" onclick="roc()">
                    <a class="select" href="#">
                        <i class='bx bx-rocket'></i>
                        <span>Rockets</span>
                    </a>
                </li>
                <li id="capsules" onclick="capsule()">
                    <a href="#">
                        <i class='bx bx-capsule'></i>
                        <span>Capsules</span>
                    </a>
                </li>
                <li id="history" onclick="historty()">
                    <a  href="#" >
                        <i class='bx bx-book-open' ></i>
                        <span>History</span>
                    </a>
                </li>
                <li id="company" onclick="company()">
                    <a href="#" >
                        <i class='bx bxs-rocket' ></i>
                        <span>Company</span>
                    </a>
                </li>
            </ul>
        </footer>
    </section>
    <nav class="nav__information">
        <div id="information__2" class="information__item">
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
        </div>
        <div id="paginacion" class="information__buttom">
            <div class="load"></div>
        </div>
    </nav>
</main>   
    `;
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


    // Mostrar motores como una barra de progreso
const enginesDiv = document.getElementById('information__2');
enginesDiv.innerHTML = `
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h2>Motores</h2>
    <div class="progress-info">
        <p>Tipo de Motor:</p>
        <span>${rocket.engines.type}</span>
    </div>
    <div class="progress-info">
        <p>Versión:</p>
        <span>${rocket.engines.version}</span>
    </div>
    <div class="progress-info">
        <p>Diseño:</p>
        <span>${rocket.engines.layout}</span>
    </div>
    ${rocket.engines.engine_loss_max ? `
        <div class="progress-info">
            <p>Pérdida Máxima del Motor:</p>
            <span>${rocket.engines.engine_loss_max}</span>
        </div>
    ` : ''}
    ${rocket.engines.propellant_1 ? `
        <div class="progress-info">
            <p>Combustible 1:</p>
            <span>${rocket.engines.propellant_1}</span>
        </div>
    ` : ''}
    ${rocket.engines.propellant_2 ? `
        <div class="progress-info">
            <p>Combustible 2:</p>
            <span>${rocket.engines.propellant_2}</span>
        </div>
    ` : ''}
    ${rocket.engines.thrust_sea_level.kN ? `
        <div class="progress-info">
            <p>Empuje al Nivel del Mar:</p>
            <span>${rocket.engines.thrust_sea_level.kN} kN (Max: 2000)</span>
        </div>
        <div class="progress">
            <div class="progress-bar" style="width: ${(rocket.engines.thrust_sea_level.kN / 2000) * 100}%;"></div>
        </div>
    ` : ''}
    ${rocket.engines.thrust_vacuum.kN ? `
        <div class="progress-info">
            <p>Empuje en el Vacío:</p>
            <span>${rocket.engines.thrust_vacuum.kN} kN (Max: 2000)</span>
        </div>
        <div class="progress">
            <div class="progress-bar" style="width: ${(rocket.engines.thrust_vacuum.kN / 2000) * 100}%;"></div>
        </div>
    ` : ''}
    ${rocket.engines.thrust_to_weight ? `
        <div class="progress-info">
            <p>Empuje a Peso:</p>
            <span>${rocket.engines.thrust_to_weight} (Max: 200)</span>
        </div>
        <div class="progress">
            <div class="progress-bar" style="width: ${(rocket.engines.thrust_to_weight / 200) * 100}%;"></div>
        </div>
    ` : ''}
`;
// Crear el elemento SVG para la barra de progreso redonda de ISP en el Vacío
const svgVacuum = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svgVacuum.setAttribute('class', 'progress-circle');
svgVacuum.setAttribute('width', '150'); // Ajustar el tamaño del SVG
svgVacuum.setAttribute('height', '150'); // Ajustar el tamaño del SVG

// Crear el círculo interno para la barra de progreso redonda de ISP en el Vacío
const circleVacuum = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
circleVacuum.setAttribute('class', 'progress-circle-inner');
circleVacuum.setAttribute('cx', '75'); // Posición x centrada
circleVacuum.setAttribute('cy', '75'); // Posición y centrada
circleVacuum.setAttribute('r', '65'); // Ajustar el radio del círculo
circleVacuum.setAttribute('stroke-width', '20'); // Ajustar el ancho del trazo
circleVacuum.setAttribute('fill', 'transparent');
circleVacuum.setAttribute('stroke', '#14162C'); // Color de la barra de progreso

// Calcular el porcentaje de progreso para ISP en el Vacío
const progressPercentVacuum = (rocket.engines.isp.vacuum / 500) * 100;

// Calcular la longitud de la barra de progreso redonda para ISP en el Vacío
const circumferenceVacuum = 2 * Math.PI * parseFloat(circleVacuum.getAttribute('r'));
const strokeDasharrayVacuum = `${(progressPercentVacuum * circumferenceVacuum) / 100} ${circumferenceVacuum}`;

// Establecer la longitud de la barra de progreso redonda para ISP en el Vacío
circleVacuum.style.strokeDasharray = strokeDasharrayVacuum;

// Agregar el círculo al SVG de ISP en el Vacío
svgVacuum.appendChild(circleVacuum);

// Crear el texto para mostrar el nombre y el valor de ISP en el Vacío
const textVacuum = document.createElementNS('http://www.w3.org/2000/svg', 'text');
textVacuum.setAttribute('x', '50%');
textVacuum.setAttribute('y', '50%'); // Posición y del texto
textVacuum.setAttribute('text-anchor', 'middle');
textVacuum.setAttribute('dominant-baseline', 'middle');
textVacuum.setAttribute('font-size', '0.7vi'); // Tamaño del texto
textVacuum.setAttribute('fill', '#fff'); // Color del texto
textVacuum.textContent = `ISP-nivel del Vacío: ${rocket.engines.isp.vacuum}`;

// Agregar el texto al SVG de ISP en el Vacío
svgVacuum.appendChild(textVacuum);

// Obtener el div existente para ISP en el Vacío dentro de .section__information__3
const vacuumDiv = document.querySelector('.section__information__3 > div');

// Agregar el SVG de ISP en el Vacío al div existente dentro de .section__information__3
if (vacuumDiv) {
    vacuumDiv.innerHTML = ''; // Limpiar el contenido existente
    vacuumDiv.appendChild(svgVacuum);
} else {
    console.error('No se encontró el div para ISP en el Vacío dentro de .section__information__3');
}



// Crear el elemento SVG para la barra de progreso redonda
const svgNS = 'http://www.w3.org/2000/svg';
const svg = document.createElementNS(svgNS, 'svg');
svg.setAttribute('class', 'progress-circle');
svg.setAttribute('width', '150'); // Aumentar el tamaño del SVG
svg.setAttribute('height', '150'); // Aumentar el tamaño del SVG

// Crear el círculo interno para la barra de progreso redonda
const circle = document.createElementNS(svgNS, 'circle');
circle.setAttribute('class', 'progress-circle-inner');
circle.setAttribute('cx', '75'); // Posición x centrada
circle.setAttribute('cy', '75'); // Posición y centrada
circle.setAttribute('r', '65'); // Aumentar el radio del círculo
circle.setAttribute('stroke-width', '20'); // Aumentar el ancho del trazo
circle.setAttribute('fill', 'transparent');
circle.setAttribute('stroke', '#14162C'); // Color de la barra de progreso
circle.style.transition = 'stroke-dasharray 0.3s ease';

// Agregar el círculo al SVG
svg.appendChild(circle);

// Calcular el porcentaje de progreso
const progressPercent = (rocket.engines.isp.sea_level / 400) * 100;

// Calcular la longitud de la barra de progreso redonda
const circumference = 2 * Math.PI * parseFloat(circle.getAttribute('r'));
const strokeDasharray = `${(progressPercent * circumference) / 100} ${circumference}`;

// Establecer la longitud de la barra de progreso redonda
circle.style.strokeDasharray = strokeDasharray;

// Crear el elemento texto dentro del SVG para el nombre y valor
const text = document.createElementNS(svgNS, 'text');
text.setAttribute('x', '50%');
text.setAttribute('y', '50%'); // Ajustar la posición y del texto
text.setAttribute('text-anchor', 'middle');
text.setAttribute('dominant-baseline', 'middle');
text.setAttribute('font-size', '0.75vi'); // Aumentar el tamaño del texto
text.setAttribute('fill', '#fff'); // Color del texto
text.textContent = `ISP-Nivel del Mar: ${rocket.engines.isp.sea_level}`;

// Agregar el texto al SVG
svg.appendChild(text);

// Obtener el div existente para ISP al Nivel del Mar
const ispSeaLevelDiv = document.querySelector('.section__information__2');

// Agregar el SVG al div existente dentro de .section__information__2
if (ispSeaLevelDiv) {
    const innerDiv = ispSeaLevelDiv.querySelector('div');
    if (innerDiv) {
        innerDiv.innerHTML = ''; // Limpiar el contenido existente
        innerDiv.appendChild(svg);
    } else {
        console.error('No se encontró el div interno dentro de .section__information__2');
    }
} else {
    console.error('No se encontró el div para ISP al Nivel del Mar dentro de .section__information__2');
}




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
    const firstStageDiv = document.getElementById('todo');
    firstStageDiv.innerHTML = `
    <header class="header">
    <div id="header__title" class="header__title">
        <div class="load"></div>
    </div>
</header>
<main class="main">
    <nav class="nav__description">
        <div id="description__item" class="description__item">
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
        </div>
        <div class="description__buttom">
        </div>
    </nav>
    <section class="main__section">
        <article id="section__information__1" class="section__information__1">
            <div class="load" style="height: 150px;"></div>
        </article>
        <article class="section__information__container">
            <div id="section__information__2" class="section__information__2">
                <div>
                    <div class="load" style="height: 150px;"></div>
                </div>
                <div id="information__table__1" class="information__table__1">
                    <div class="load" style="height: 160px;"></div>
                </div>
            </div>

                <!--Imagenes-->
            <div id="section__image" class="section__image">
                <div class="load" style="height: 350px"></div>
            </div>


            <div class="section__information__3">
                <div id="yes">
                    <div class="load" style="height: 150px;"></div>
                </div>
                <div id="information__table__2" class="information__table__2">
                    <div class="load" style="height: 160px;"></div>
                </div>
            </div>
        </article>
        <footer class="footer">
            <ul>
                <li id="rockets" onclick="roc()">
                    <a  href="#">
                        <i class='bx bx-rocket'></i>
                        <span>Rockets</span>
                    </a>
                </li>
                <li id="capsules" onclick="capsule()">
                    <a class="select" href="#">
                        <i class='bx bx-capsule'></i>
                        <span>Capsules</span>
                    </a>
                </li>
                <li id="history" onclick="historty()">
                    <a  href="#" >
                        <i class='bx bx-book-open' ></i>
                        <span>History</span>
                    </a>
                </li>
                <li id="company" onclick="company()">
                    <a href="#" >
                        <i class='bx bxs-rocket' ></i>
                        <span>Company</span>
                    </a>
                </li>
            </ul>
        </footer>
    </section>
    <nav class="nav__information">
        <div id="information__2" class="information__item">
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
            <div class="load"></div>
        </div>
        <div id="paginacion" class="information__buttom">
            <div class="load"></div>
        </div>
    </nav>
</main>   
    `;
    
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
        function displayCurrentCapsuleInfo() {
            // Limpiar los div con los IDs especificados
            const divsToClear = [
                'section__information__1',
                'description__item',
                'information__2',
                'section__information__2',
                'section__information__3',
                'section__image',
                'yes',
                'information__table__2'
            ];
        
            divsToClear.forEach(id => {
                const div = document.getElementById(id);
                if (div) {
                    div.innerHTML = ''; // Limpiar el contenido del div
                } else {
                    console.error(`No se encontró el div con el ID: ${id}`);
                }
            });
        
            // Resto del código para mostrar la información de la cápsula
            const capsule = capsulesData[currentCapsuleIndex];
            const title = document.getElementById('header__title');
            const h1 = document.createElement('h1');
            h1.textContent = capsule.serial;
            title.innerHTML = '';
            title.appendChild(h1);
            console.log(capsule.serial);
        
            // Verificar si la cápsula tiene lanzamientos
            if (capsule.launches.length > 0) {
                // Obtener información de todos los lanzamientos de la cápsula
                let launcher = document.getElementById('description__item');
                let logo = document.getElementById('section__image');
                capsule.launches.forEach(launchId => {
                    const launchUrl = `https://api.spacexdata.com/v4/launches/${launchId}`;
        
                    fetch(launchUrl)
                        .then(response => response.json())
                        .then(data => {
                            const launchName = data.name;
                            const launchImageSmall = data.links.patch.small;
                            const staticFireDateUtc = data.static_fire_date_utc;
                            const launchinfo = data.details;
                            const staticFireDateUtc2 = staticFireDateUtc ? staticFireDateUtc.slice(0, 10) : 'Desconocida';
                            let tdv = document.createElement('div');
                            tdv.innerHTML = `
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
        
            // Creación de botones para paginación
            const pag = document.getElementById('paginacion');
            pag.innerHTML = '';
            for (let i = 0; i < capsulesData.length; i++) {
                const btn = document.createElement('button');
                btn.textContent = i + 1;
                btn.className = 'btnPaginacion';
                pag.appendChild(btn);
            }
            const btnChange = document.querySelectorAll('.btnPaginacion');
            btnChange.forEach((e) => {
                e.addEventListener('click', () => {
                    let pagina = parseInt(e.textContent);
                    currentCapsuleIndex = pagina - 1;
                    getDataCapsules();
                });
            });
        } 
    }

    getDataCapsules();
}


// Obtener la lista de elementos <li> del menú
const menuItems = document.querySelectorAll('.footer ul li');

// Agregar un evento 'click' a cada elemento de menú
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remover la clase 'select' de todos los elementos <a> dentro de <li>
        menuItems.forEach(item => {
            const link = item.querySelector('a');
            link.classList.remove('select');
        });

        // Agregar la clase 'select' solo al elemento <a> del elemento <li> actual
        const currentLink = item.querySelector('a');
        currentLink.classList.add('select');
    });
});


roc()