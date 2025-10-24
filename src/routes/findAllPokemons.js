
import { Pokemon } from '../db/sequelize.js';
import pokemon from '../models/pokemon.js';

const getPokemons = (app) => {
  app.get('/api/pokemons', async (req, res) => {
   Pokemon.findAll()
   .then(pokemon => {
    const message ='La liste des pokémons a bien été recepurée.';
    res.json({message: message, data: pokemon});
   })
   .catch(error => {
    const message = `La liste des pokémons n'a pas pu être récupérée. Réesssayez dans quelques instants.`;
    res.status(500).json({message: message, data: error});
   })

  });
};

export default getPokemons;
