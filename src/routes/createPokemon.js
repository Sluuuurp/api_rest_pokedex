// routes/createPokemon.mjs
import { Pokemon } from "../db/sequelize.js";
import { ValidationError } from "sequelize";

const authorizedFfields = ["name", "hp", "cp", "types", "picture"];

const createPokemon = (app) => {
  app.post("/api/pokemons", (req, res) => {
    for (const field in req.body) {
      if (!authorizedFfields.includes(field)) {
        const message = `La propriété '${field}' n'ai pas modifiable. Seules les propriétés suivantes le sont : ${authorizedFfields}`;
        return res.status(404).json({ message });
      }
    }
    Pokemon.create(req.body)
      .then((pokemon) => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`;
        res.json({ message: message, data: pokemon });
      })
      // Début des modifications
      .catch((error) => {
        if( error instanceof ValidationError){
          return res.status(400).json({message: error.message, data: error});
        }
        const message = `Le pokémon n'a pas pu être ajouté. Réessayez dans quelques instants.`;
        res.status(500).json({ message: message, data: error });
      });
    // Fin des modifications
  });
};

export default createPokemon;
