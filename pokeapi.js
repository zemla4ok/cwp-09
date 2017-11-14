const Promise = require('bluebird');
const axios = require('axios');

//download pokemon with id 42
axios.get('http://pokeapi.co/api/v2/pokemon/42')
    .then((res) => {
        console.log(`name: ${res.data.name}, weight: ${res.data.weight}, height: ${res.data.height}`);
    })

//download 30 pokemons
let result = [];
for(let i=0;i<3;i++){
    result.push(axios.get('http://pokeapi.co/api/v2/pokemon/?limit=10'));
}
Promise.all(result)
    .then((res) => {
        res.forEach((val, resInd)=>{
            val.data.results.forEach((pokemon, ind) => {
                console.log(`${resInd}-${ind}: ${pokemon.name}`);
            })
        })
    })