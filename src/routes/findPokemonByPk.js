// routes/findPokemonById.mjs
import { Pokemon } from "../db/sequelize.js";

const getPokemonById = (app) => {
  app.get("/api/pokemons/:id", async (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        // Début des modifications
        if (pokemon === null) {
          const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.`;
          return res.status(404).json({ message: message });
        }
        const message = "Un pokémon a bien été trouvé.";
        res.json({ message: message, data: pokemon });
      })
      .catch((error) => {
        const message = `Le pokémon n'a pas pu être récupéré. Réessayer dans quelques instants`;
        res.status(500).json({ message: message, data: error });
      });
  });
};

export default getPokemonById;
