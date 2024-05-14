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
    const 
    
   
    // Mostrar imágenes
    const imagesDiv = document.getElementById('section__image');
    imagesDiv.innerHTML = '';
    rocket.flickr_images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Rocket Image';
        img.style.width = '200px'; // Estilo opcional para el tamaño de la imagen
        imagesDiv.appendChild(img);



    });
}
getDataRockets();