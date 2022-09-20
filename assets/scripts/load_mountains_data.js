"use strict"

let mountainsArray = []


//to call json array class ("mountains") object attribute ("name") to dropdown menu
window.onload = function(){

    loadJsonData("assets/data/mountains.json").then((selected) => {
        mountainsArray = selected.mountains;
        const mountainList = document.getElementById('mountain-list');
        let arrLength = mountainsArray.length;
        for (let i = 0; i < arrLength; i++) {
            let selected = new Option(mountainsArray[i].name);
            mountainList.appendChild(selected);
        }   
    })

    const selected = document.getElementById('mountain-click');
    selected.onclick = mtnData;
};

//to display class ("mountains") object attributes (all info) below dropdown
function mtnData() {
    //const mtnDisplay = document.getElementById('mtn-display'); -->Idk what this is for. Get rid of this.
    const selected = document.getElementById('mountain-list');

    let nm = mountainsArray.find(mountains => mountains.name === selected.value).name;
    let el = mountainsArray.find(mountains => mountains.name === selected.value).elevation;
    let ef = mountainsArray.find(mountains => mountains.name === selected.value).effort;
    let pic = mountainsArray.find(mountains => mountains.name === selected.value).img;
    let desc = mountainsArray.find(mountains => mountains.name === selected.value).desc;
    let co = mountainsArray.find(mountains => mountains.name === selected.value);
    let cord = co.coords;

    let cordlat = cord.lat;
    let cordlong = cord.lng;

}

//to display class ("mountains") object attributes (all info) below dropdown
//function displayMtn() {}





//function that can "fetch" the sunset/sunrise times

let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}

/*        "name": "Mt. Adams", (nm
        "elevation": 5799, (el)
        "effort": "Strenuous", (ef)
        "img": "Adams-StoryImage_2.jpg", (pic)
        "desc": "Mt. Adams (5,799') is the second highest peak in New England, offering spectacular views across the Great Gulf and King Ravine.", (desc)
        "coords": { (co)
            "lat": 44.320686,
            "lng": -71.291742  */