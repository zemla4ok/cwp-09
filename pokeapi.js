const Promise = require('bluebird');
const axios = require('axios');

//download pokemon with id 42
axios.get('http://pokeapi.co/api/v2/pokemon/42')
    .then((res) => {
        console.log(`name: ${res.data.name}, weight: ${res.data.weight}, height: ${res.data.height}`);
    })