
import express from 'express';
import morgan from 'morgan';
import serveFavicon from 'serve-favicon';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDb } from './src/db/sequelize.js';

// Nécessaire pour __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(serveFavicon(`${__dirname}/favicon.ico`))
   .use(morgan('dev'))
   .use(express.json());

// Initialisation de la base de données
initDb();

//affiche tout les pokemons
import getPokemons from './src/routes/findAllPokemons.js';
getPokemons(app);

//affiche un pokemon garce a son ID
import getPokemonById from './src/routes/findPokemonByPk.js';
getPokemonById(app)

//créé un pokemon
import createPokemon from './src/routes/createPokemon.js';
createPokemon(app)

//mettre a jour pokemon
import updatePokemon from './src/routes/updatePokemon.js';
updatePokemon(app);

//supprimer un pokemon
import deletePokemon from './src/routes/deletePokemon.js';
deletePokemon(app);

//traitement des erreurs
app.use(({res}) => {
  const message = `Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.`;
  res.status(404).json({message: message});
});

app.listen(port, () => 
  console.log(`Notre application Node est démarrée sur http://localhost:${port}`)
);
