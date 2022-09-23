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
    clearTable();
    createTable();
    addTableHead();
    loadSelected(selectedParks);
}

searchBoxType.onchange = function filterType(item) {
    let selectedParks = nationalParksArray.filter(parks => {return parks.LocationName.includes(searchBoxType.value)
    })
    clearTable();
    createTable();
    addTableHead();
    loadSelected(selectedParks);
}



function clearTable() {
    let tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
}

function createTable() {
    let dataTable = document.createElement('table');
    dataTable.id = 'parkDisplayTable';
    dataTable.className = 'table bg-success bg-opacity-25 border border-3 border-dark';
    const tableContainer = document.getElementById('table-container');
    tableContainer.appendChild(dataTable);
}

function addTableHead() {
    let loadHeader = document.getElementById('parkDisplayTable')
    let row1 = document.createElement('tr')
    row1.className = 'fs-2 text-center'
    let thName = document.createElement('th')
    thName.innerHTML = 'Park Name'
    row1.appendChild(thName);
    let thAdd = document.createElement('th')
    thAdd.innerHTML = 'Address'
    row1.appendChild(thAdd);
    let thCit = document.createElement('th')
    thCit.innerHTML = 'City'
    row1.appendChild(thCit);
    let thState = document.createElement('th')
    thState.innerHTML = 'State'
    row1.appendChild(thState);
    let thZip = document.createElement('th')
    thZip.innerHTML = 'Zip Code'
    row1.appendChild(thZip);
    let thPhone = document.createElement('th')
    thPhone.innerHTML = 'Phone Number'
    row1.appendChild(thPhone);
    loadHeader.appendChild(row1);
}

function loadSelected(list) {
    let loadData = document.getElementById('parkDisplayTable')
    let listLength = list.length;
    for (let i = 0; i < listLength; i++) {
        let AddRowInfo = loadData.insertRow(-1);
        AddRowInfo.className = 'text-center'
        let addName = AddRowInfo.insertCell(0);
        addName.className = 'fs-4 ps-2'
        addName.innerHTML = list[i].LocationName;
        let addAdd = AddRowInfo.insertCell(1);
        if (list[i].Address == 0) {
            addAdd.innerHTML = 'N/A';
        } else {
        addAdd.innerHTML = list[i].Address
        }
        let addCit = AddRowInfo.insertCell(2);
        addCit.innerHTML = list[i].City
        let addState = AddRowInfo.insertCell(3);
        addState.innerHTML = list[i].State
        let addZip = AddRowInfo.insertCell(4);
        if (list[i].ZipCode == 0) {
            addZip.innerHTML = 'N/A';
        } else {
            addZip.innerHTML = list[i].ZipCode
        }
        let addPhone = AddRowInfo.insertCell(5);
        if (list[i].Phone == 0) {
            addPhone.innerHTML = 'N/A';
        } else {
        addPhone.innerHTML = list[i].Phone
        }
}}




let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}
