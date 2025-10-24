// db.mjs
import { Sequelize, DataTypes } from 'sequelize';
import PokemonModel from '../models/pokemon.js';
import pokemons from './mock-pokemon.js';

const sequelize = new Sequelize('pokedex', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: '+01:00'
  },
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('La connexion à la BDD a bien été établie.'))
  .catch(error => console.error(`Impossible de se connecter à la BDD : ${error}`));

const Pokemon = PokemonModel(sequelize, DataTypes);

const initDb = async () => {
  try {
    await sequelize.sync({ force: true });

    // Crée tous les Pokémon en séquence
    for (const pokemon of pokemons) {
      const created = await Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      });
      console.log(created.toJSON());
    }

    console.log('La base de données a bien été initialisée.');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la BDD :', error);
  }
};

export { initDb, Pokemon };
