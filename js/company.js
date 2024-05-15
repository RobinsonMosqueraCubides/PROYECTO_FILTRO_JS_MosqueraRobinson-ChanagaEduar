class company extends HTMLElement{
    constructor(){
        super();
        this.render();
        this.getDataCompany();
    }
    render(){
        this.innerHTML=`
        <style>
            @import url('../css/company.css');
        </style>
        <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css">
        <header class="header"><h1 id="companyName"></h1></header>
        <main class="container" id="container">
            <article class="main" id="main">
                <section id="information"></section>
                <section id="icons">
                    <i class='bx bxl-twitter'></i>
                    <i class='bx bxl-reddit' ></i>
                    <i class='bx bxl-vk' ></i>
                </section>
            </article>
        </main>`;
    }
    getDataCompany(){
        fetch('https://api.spacexdata.com/v4/company')
        .then(response => response.json())
        .then(data => {
            document.getElementById('companyName').innerText = data.name;
            const informationDiv = document.getElementById('information');
            informationDiv.innerHTML = `
                <p>${data.summary}</p><br>
                <p><strong>Founder:</strong> ${data.founder}</p>
                <p><strong>CEO:</strong> ${data.ceo}</p>
                <p><strong>CTO:</strong> ${data.cto}</p>
                <p><strong>COO:</strong> ${data.coo}</p>
                <p><strong>CTO Propulsion:</strong> ${data.cto_propulsion}</p>
                <p><strong>Founded:</strong> ${data.founded}</p>
                <p><strong>Employees:</strong> ${data.employees}</p>
                <p><strong>Vehicles:</strong> ${data.vehicles}</p>
                <p><strong>Launch Sites:</strong> ${data.launch_sites}</p>
                <p><strong>Test Sites:</strong> ${data.test_sites}</p>
                <p><strong>Valuation:</strong> ${data.valuation}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
}
customElements.define('company-component',company);