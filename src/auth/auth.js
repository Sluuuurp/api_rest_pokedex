import jwt from "jsonwebtoken";
import private_key from "./private_key.js";

console.log("Middleware auth chargé !");

export default (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  console.log("➡️ Header reçu:", authorizationHeader);

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message: message });
  }

  const token = authorizationHeader.split(" ")[1];
  console.log("mon token: ", token);
  console.log("➡️ Requête URL:", req.originalUrl);

  jwt.verify(token, private_key, (error, decodedToken) => {
    if (error) {
      const message = `L'utlisateur n'est pas autorisé à accéder à cette ressource.`;
      return res.status(401).json({ message: message, data: error });
    }

    const userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`;
      return res.status(401).json({ message: message });
    }

    req.userId = userId;

    next();
  });
};
