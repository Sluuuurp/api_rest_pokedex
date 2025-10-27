// routes/updatePokemon.mjs
import { Pokemon } from "../db/sequelize.js";
import { ValidationError } from "sequelize";

const authorizedFfields = ["name", "hp", "cp", "types", "picture"]; // <-- Ligne ajoutée

const updatePokemon = (app) => {
  app.put("/api/pokemons/:id", async (req, res) => {
    const id = req.params.id;
    for (const field in req.body) {
      if (!authorizedFfields.includes(field)) {
        const message = `La propriété '${field}' n'ai pas modifiable. Seules les propriétés suivantes le sont : ${authorizedFfields}`;
        return res.status(404).json({ message });
      }
    }

    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then((_) => {
        return Pokemon.findByPk(id).then(result => {
          if (result === null) {
            const message = `Le pokémon demandée n'existe pas. Réessayez avec un autre identifiant.`;
            return res.status(404).json({ message });
          }
          const pokemon = result.get({ plain: true});
          delete pokemon.types_string;
          const message = `Le pokémon ${pokemon.name} a bien modifié.`;
          res.json({ message: message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `le pokémon n'a pas pu être modifié. Réesayez dans quelques instants.`;
        res.status(500).json({ message: message, data: error });
      });
  });
};

export default updatePokemon;
