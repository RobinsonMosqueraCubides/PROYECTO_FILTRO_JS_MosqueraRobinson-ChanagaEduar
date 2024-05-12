async function getDataCapsule() {
    let URL = 'https://api.spacexdata.com/v4/capsules';
    try{
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data[0].id);
    }
    catch(error){
        console.log(error);
    }
}

getDataCapsule();