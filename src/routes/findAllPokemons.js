import { Pokemon } from "../db/sequelize.js";
import pokemon from "../models/pokemon.js";
import { Op } from "sequelize";

const getPokemons = (app) => {
  app.get("/api/pokemons", async (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      Pokemon.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      })
      .then((result) => {
        const pokemons = result.map((pokemon) => {
          pokemon = pokemon.get({ plain: true });
          delete pokemon.types_string;
          return pokemon;
        });
        const message = `Il y a ${pokemons.length} pokémon(s) qui correspondent au terme de recherche '${name}'.`;
        res.json({ message: message, data: pokemons });
      });
    } else {
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
    }
  });
};

export default getPokemons;
