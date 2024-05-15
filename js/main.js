import './capsules.js';
import './rockets.js';
import  './histories.js'
import './company.js'
function reconocer(x){
    let elemento = document.querySelectorAll(x);
    elemento.forEach((e)=>{
        e.addEventListener('click',()=>{
            let idName = e.id;
            console.log(idName);
            let getElem = document.getElementById('todo');
            getElem.innerHTML = `<${idName}-component></${idName}-component>`;
        });
    });
}
reconocer('#rockets');
reconocer('#capsules');
reconocer('#history');
reconocer('#company');