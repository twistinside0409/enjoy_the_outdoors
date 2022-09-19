"use strict"

let mountainsArray = []

//My add
let mountainList = document.getElementById("#mountain-list") //"DDL"
let mountainOutput = document.getElementById("#mountain-output") //"outputdiv"


window.onload = function(){

    loadJsonData("assets/data/mountains.json").then((mountains) => {
        mountainsArray = mountains.mountains;
    })

}


//function that can "fetch" the sunset/sunrise times
let loadJsonData = async (path) => {
    let response = await fetch(path)
    let data = await response.json()
    return data
}