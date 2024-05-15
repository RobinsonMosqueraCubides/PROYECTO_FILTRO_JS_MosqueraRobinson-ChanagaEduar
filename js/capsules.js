class capsules extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.getDataCapsules();
        this.capsulesData;
        this.currentCapsuleIndex = 0;
    }
    render(){
        this.innerHTML = `
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
                        <div id='launcher' class="load" style="height: 150px;"></div>
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
    }
    getDataCapsules(){
        const apiUrl = 'https://api.spacexdata.com/v4/capsules';
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            this.capsulesData = data;
            this.displayCurrentCapsuleInfo(); // Mostrar la información de la primera cápsula al inicio
        })
        .catch(error => {
            console.error('Error al obtener la información:', error);
        });
    }
    displayCurrentCapsuleInfo(){
        // Resto del código para mostrar la información de la cápsula
        const capsule = this.capsulesData[this.currentCapsuleIndex];
        const title = document.getElementById('header__title');
        const h1 = document.createElement('h1');
        h1.textContent = capsule.serial;
        title.innerHTML = '';
        title.appendChild(h1);


          // Verificar si la cápsula tiene lanzamientos
          if (capsule.launches.length > 0) {
            // Obtener información de todos los lanzamientos de la cápsula
            let launcher = document.getElementById('description__item');
            let logo = document.getElementById('section__image');
            let h2 = document.getElementById('section__information__1');
            h2.innerHTML = '<div class="load"></div>'
            launcher.innerHTML = '';
            logo.innerHTML='';
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
                    })
                    .catch(error => {
                        console.error('Error al obtener la información del lanzamiento:', error);
                    });
            });
        } else {
            // Si la cápsula no tiene lanzamientos, mostrar un mensaje en lugar de la información del lanzamiento
            let logo = document.getElementById('section__information__1');
            logo.innerHTML = '<h2>Esta cápsula no tiene lanzamientos.</h2>';
            let launcher = document.getElementById('description__item');
            let img = document.getElementById('section__image');
            launcher.innerHTML = '<div class="load"></div>';
            img.innerHTML= `<img src="storage/image/capsula.webp" alt="Imagen" width="280vi" />`;
        }
    
        let capsuleInformation = document.getElementById('information__2');
        capsuleInformation.innerHTML = `
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
        for (let i = 0; i < this.capsulesData.length; i++) {
            const btn = document.createElement('button');
            btn.textContent = i + 1;
            btn.className = 'btnPaginacion';
            pag.appendChild(btn);
        }
        const btnChange = document.querySelectorAll('.btnPaginacion');
        btnChange.forEach((e) => {
            e.addEventListener('click', () => {
                let pagina = parseInt(e.textContent);
                this.currentCapsuleIndex = pagina - 1;
                this.getDataCapsules();
            });
        });
    }
}

customElements.define('capsules-component', capsules);