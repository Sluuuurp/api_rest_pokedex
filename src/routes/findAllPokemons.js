import { Pokemon } from "../db/sequelize.js";
import pokemon from "../models/pokemon.js";
import { Op } from "sequelize";

const getPokemons = (app) => {
  app.get("/api/pokemons", async (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;
      const offset = parseInt(req.query.offset) || 0;

      if(name.length < 2) {
        const message = `Le terme de recherche doit contenir au moins 2 caractères.`;
        return res.status(400).json({ message: message });
      }

      Pokemon.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: [['name', 'ASC']],
        limit: limit,
        offset: offset,
      })
       .then(({count, rows}) => {
        const pokemons = rows.map(pokemon => {
          pokemon = pokemon.get({ plain: true });
          delete pokemon.types_string;
          return pokemon;
        });
        const message = `Il y a ${count} pokémon(s) qui correspondent au terme de recherche '${name}'.`;
        res.json({ message: message, data: pokemons });
      });
    } else {
      Pokemon.findAll({order: [['name', 'ASC']] })
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
