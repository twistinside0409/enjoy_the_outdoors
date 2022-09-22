"use strict"

let locationsArray = []
let nationalParksArray = []
let parkTypesArray = []

const searchBoxLoc = document.getElementById('search-box-location')
const searchBoxType = document.getElementById('search-box-type');

window.onload = function(){

    loadJsonData("assets/data/locations.json").then((locations) => {
        locationsArray = locations;
        let arrLength = locationsArray.length;
        for (let i = 0; i < arrLength; i++) {
            let locations = new Option(locationsArray[i]);
            searchBoxLoc.appendChild(locations);
        }
    })

    loadJsonData("assets/data/nationalparks.json").then((nationalParks) => {
        nationalParksArray = nationalParks.parks;

    })


    loadJsonData("assets/data/parktypes.json").then((parkTypes) => {
        parkTypesArray = parkTypes;
        let arrLength = parkTypesArray.length;
        for (let i = 0; i < arrLength; i++) {
                let parkTypes = new Option(parkTypesArray[i]);
                searchBoxType.appendChild(parkTypes);
        }
    })
}



const radioType = document.getElementById('radio-type') //To CALL the function below
radioType.onclick = displayTypes;

function displayTypes (radiobtn){ //Function displays TYPE dropdown and removes LOCATION dropdown
    searchBoxType.classList.remove('d-none');
    searchBoxLoc.classList.add('d-none');
}

const radioLoc = document.getElementById('radio-loc') //To CALL the function below
radioLoc.onclick = displayLoc;

function displayLoc (radiobtn){ //Function displays LOCATION dropdown and rmeoves TYPE dropdown
    searchBoxLoc.classList.remove('d-none');
    searchBoxType.classList.add('d-none');
}

searchBoxLoc.onchange = function filterLoc(item) {
    let selectedParks = nationalParksArray.filter(parks => {return parks.State === searchBoxLoc.value;
    })
    console.log(selectedParks)
}

searchBoxType.onchange = function filterType(item) {
    let selectedParks = nationalParksArray.filter(parks => {return parks.LocationName.includes(searchBoxType.value)
    })
    console.log(selectedParks)
}






function createTable() {
    let dataTable = document.createElement('table');
    dataTable.id = 'parkDisplayTable';
    dataTable.className = 'table-success';
    const tableContainer = document.getElementById('table-container');
    tableContainer.appendChild(dataTable);
}









let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}
