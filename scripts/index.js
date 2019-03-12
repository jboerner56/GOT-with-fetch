// const URL = "http://my-little-cors-proxy.herokuapp.com/https://anapioficeandfire.com/api/characters/?page=1&pageSize=50";
let allCaracterArray = [];
function urlForPage(pageNumber){
    return "http://my-little-cors-proxy.herokuapp.com/https://anapioficeandfire.com/api/characters/?page=${pageNumber}1&pageSize=50"
}
function accumulateCharacters(actualData){
    allCaracterArray = [
        ...allCaracterArray,
        ...actualData
    ];
    storeCharacters(allCaracterArray)
}
const storageKey = "game-of-thrones"
function storeCharacters(arrayOfCharacters){
    // convert array to JSON array
    const jsonCharacters = JSON.stringify(arrayOfCharacters);
    // store tht array in local storage
    localStorage.setItem('storageKey', jsonCharacters);

}
function loadCharacters(){
    // get JSON string from local storage
    const jsonCharacters = localStorage.getItem(storageKey,jsonCharacters);
    // convert back into array
    const arrayOfCharacters = JSON.parse(jsonCharacters);
    // retuirn it
    return arrayOfCharacters;
}
function retrievePageOfCharacters(pageNumber){
        fetch(urlForPage(pageNumber))
            .then(function(response){
                return response.json();
            })
            .then (accumulateCharacters)
            .then(function(){
                console.log(`done with page ${pageNumber}`)
        })
    }
for(let pageNumber=0; pageNumber<50; pageNumber++){
    let delay = pageNumber * 100
    setTimeout(function(){
        retrievePageOfCharacters(pageNumber);
    }, delay);
}