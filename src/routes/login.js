import { User } from "../db/sequelize.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import private_key from "../auth/private_key.js";

const login = (app) => {
  app.post("/api/login", (req, res) => {
    if (req.body.username === undefined) {
      const message = `Le nom de l'utilisateur est requis`;
      return res.status(400).json({ message: message });
    }

    if (req.body.password === undefined) {
      const message = `Le mot de passe est requis`;
      return res.status(400).json({ message: message });
    }

    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message = "L'utilisateur demandé n'existe pas.";
          return res.status(404).json({ message });
        }

        // Vérifie le mot de passe
        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = "Le mot de passe est incorrect.";
              return res.status(401).json({ message });
            }
            //token jwt
            const token = jwt.sign({ userId: user.id }, private_key, {
              expiresIn: "24h",
            });

            const message = "L'utilisateur a été connecté avec succès.";
            return res.json({ message: message, data: user, token: token });
          })
          .catch((error) => {
            const message = "Erreur lors de la vérification du mot de passe.";
            res.status(500).json({ message, data: error });
          });
      })
      .catch((error) => {
        const message = "Erreur lors de la recherche de l'utilisateur.";
        res.status(500).json({ message, data: error });
      });
  });
};

export default login;
