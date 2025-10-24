// routes/updatePokemon.mjs
import { Pokemon } from "../db/sequelize.js";

const updatePokemon = (app) => {
  app.put("/api/pokemons/:id", async (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Pokemon.findByPk(id).then((pokemon) => {
          if (pokemon === null) {
            const message = `Le pokémon demandée n'existe pas. Réessayez avec un autre identifiant.`;
            return res.status(404).json({ message });
          }
          const message = `Le pokémon ${pokemon.name} a bien modifié.`;
          res.json({ message: message, data: pokemon });
        });
      })
      .catch((error) => {
        const message = `le pokémon n'a pas pu être modifié. Réesayez dans quelques instants.`;
        res.status(500).json({ message: message, data: error });
      });
  });
};

export default updatePokemon;
