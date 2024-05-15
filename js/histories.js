class histories extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.getDataHistory();
        this.evensData;
        this.currentEventIndex=0;
    }
    render(){
        this.innerHTML=`
        <style>
            @import url('../css/history.css');
        </style>
        <header class="header"><h1>SpaceX history</h1></header>
        <main class="container">
            <section id="container-2">
            </section>
            <article id="contexto">
                <h2 id="titulo">
                </h2>
                <div id="historiaFecha">
                    <div id="historia">
                    </div>
                    <br>
                    <div id="fecha">
                    </div>
                </div>
                <div id="logo">
                    <img src="storage/image/SpaceXLogo.png" alt="">
                </div>
            </article>
            <section id="container-1">
            </section>
        </main>`;
    }
    getDataHistory(){
        const apiUrl = 'https://api.spacexdata.com/v4/history';
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            this.eventsData = data;
            this.generateEventButtons(); // Generar los botones de eventos al inicio
            this.displayCurrentEventInfo(); // Mostrar la información del primer evento al inicio

            
        })
        .catch(error => {
            console.error('Error al obtener la información de los eventos:', error);
        });
    }
    generateEventButtons() {
        const container1 = document.getElementById('container-1');
        const container2 = document.getElementById('container-2');
        this.eventsData.forEach((event, index) => {
            const button = document.createElement('button');
            button.textContent = event.title;
            button.setAttribute('id', 'botton__history'); // Establecer el ID del botón
            button.addEventListener('mouseover', function () {
                this.currentEventIndex = index;
                this.displayCurrentEventInfo();
            }.bind(this)); // Enlazar el contexto de 'this'
            if (index < this.eventsData.length / 2) {
                container1.appendChild(button);
            } else {
                container2.appendChild(button);
            }
        });
    }
    displayCurrentEventInfo() {
        const eventInfoDiv = document.getElementById('historia');
        const eventTitleDiv = document.getElementById('titulo');
        const eventDateDiv = document.getElementById('fecha');
        const event = this.eventsData[this.currentEventIndex];
        const fecha = event.event_date_utc
        const fecha2 = fecha.slice(0,10)
        if (event) {
            eventTitleDiv.textContent = event.title;
            eventDateDiv.textContent = `Fecha del evento: ${fecha2}`;
            eventInfoDiv.textContent = event.details;
        } else {
            eventTitleDiv.textContent = 'Evento no encontrado';
            eventDateDiv.textContent = '';
            eventInfoDiv.textContent = '';
        }
    }
}
customElements.define('history-component',histories);