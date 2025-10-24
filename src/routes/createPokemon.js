// routes/createPokemon.mjs
import { Pokemon } from "../db/sequelize.js";

const createPokemon = (app) => {
  app.post("/api/pokemons", (req, res) => {
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message: message, data: pokemon });
      })
      // Début des modifications
      .catch((error) => {
        const message = `Le pokémon n'a pas pu être ajouté. Réessayez dans quelques instants.`;
        res.status(500).json({ message: message, data: error });
      });
    // Fin des modifications
  });
};

export default createPokemon;
