function initiatePlanner() {
    // Recommended by axios documentation to provide autocomplete and parameter typings
    // const axios = require('axios').default;
    console.log("script.js is working.")

    axios.get('https://pokeapi.co/api/v2/pokemon/charmander')
  .then(function (response) {
    // handle success
    console.log(response);
  })


}
initiatePlanner();