"use strict"

let mountainsArray = []



window.onload = function(){

    loadJsonData("assets/data/mountains.json").then((mountains) => {
        mountainsArray = mountains.mountains;
        const mountainList = document.getElementById('mountain-list');
        let arrLength = mountainsArray.length;
        for (let i = 0; i < arrLength; i++) {
            let mountains = new Option(mountainsArray[i].name);
            mountainList.appendChild(mountains);
        }
    })

}






//function that can "fetch" the sunset/sunrise times

let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}