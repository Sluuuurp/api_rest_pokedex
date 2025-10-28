import { Pokemon } from "../db/sequelize.js";
import pokemon from "../models/pokemon.js";

const getPokemons = (app) => {
  app.get("/api/pokemons", async (req, res) => {
    Pokemon.findAll()
      .then((result) => {
        const pokemons = result.map((pokemon) => {
          pokemon = pokemon.get({ plain: true });
          delete pokemon.types_string;
          return pokemon;
        });
        const message = "La liste des pokémonsa a bien été récupérée.";
        res.json({ message: message, data: pokemons });
      })
      .catch((error) => {
        const message = `La liste des pokémons n'a pas pu être récupérée. Réesssayez dans quelques instants.`;
        res.status(500).json({ message: message, data: error });
      });
  });
};

export default getPokemons;
