const Promise = require('bluebird');
const axios = require('axios');

//download pokemon with id 42

axios.get('http://pokeapi.co/api/v2/pokemon/42')
    .then((res) => {
        console.log(`name: ${res.data.name}, weight: ${res.data.weight}, height: ${res.data.height}`);
    }).catch((err) => {
        console.log('error in id 42')
        console.error(err);
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
    }).catch((err) => {
        console.log('error in 30')
        console.error(err);
    })

//1, 4, 7

Promise.any([
    axios.get('http://pokeapi.co/api/v2/pokemon/1'),
    axios.get('http://pokeapi.co/api/v2/pokemon/4'),
    axios.get('http://pokeapi.co/api/v2/pokemon/7')
]).then((result) => {
    console.log(`first is: ${result.data.name}`);
}).catch((err) => {
    console.log('error in any')
    console.error(err);
})

//10 pokemons, items and locations

Promise.props({
    pokemons: axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`),
    items: axios.get(`https://pokeapi.co/api/v2/item/?limit=10`),
    locations: axios.get(`https://pokeapi.co/api/v2/location/?limit=10`)
}).then((result) => {
    console.log("POKEMONS");
    result["pokemons"].data.results.forEach((val) => {
        console.log(val.name);
    });
    console.log("ITEMS");
    result["items"].data.results.forEach((val) => {
        console.log(val.name);
    });
    console.log("LOCATIONS");
    result["locations"].data.results.forEach((val) => {
        console.log(val.name);
    });
}).catch((err) => {
    console.log('error in pokemons/items/locations')
    console.error(err);
})

//get 4 berries

Promise.map([1, 2, 3, 4], (i) => {
    return axios.get(`http://pokeapi.co/api/v2/pokemon/${i}`)
}).then((result) => {
    result.forEach((val) => {
        console.log(val.data.name);
    })
}).catch((err) => {
    console.log('error in berries');
    console.error(err);
})