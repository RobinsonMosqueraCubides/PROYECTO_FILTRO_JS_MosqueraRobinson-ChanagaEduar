async function getDataCapsule() {
    let URL = 'https://api.spacexdata.com/v4/capsules';
    try{
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}
async function getDataHistory() {
    let URL = 'https://api.spacexdata.com/v4/rockets';
    try{
        let response = await fetch(URL);
        let data = await response.json();
        console.log(data);
    }
    catch(error){
        console.log(error);
    }
}

getDataHistory();
getDataCapsule();