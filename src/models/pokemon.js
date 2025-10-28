import { error } from "console";
import { get } from "http";
import { type } from "os";

const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

export default (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: `Le nom est déjà pris.` },
        validate: {
          notEmpty: { msg: `Le Champs nom ne pas etre vide` },
          notNull: { msg: `Le Nom est unne propriété requise` },
          len: {
            args: [1, 25],
            msg: `Le nom doit être composé de 1 à 25 caractères.`,
          },
          is: {
            args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9 -]+$/i,
            msg: `Le nom ne peut contenir que des caractères numériques, alphabétiques avec ou sans accents, des espaces ou des tirets.`,
          },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: `Utilisez uniquement des nombres entiers pour les points de vie.`,
          },
          notNull: { msg: `Les points de vie sont une propriété requise.` },
          min: {
            args: [0],
            msg: `Les points de vie doivent être au minimum de 0.`,
          },
          max: {
            args: [999],
            msg: `Les points de vie doivent etre au maximum de 999.`,
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: `Utilisez uniquement des nombres entiers pour les cp.`,
          },
          notNull: { msg: `Les cp sont une propriété requise.` },
        },
        min: {
          args: [0],
          msg: `les cp doivent etre au minimum de 0.`,
        },
        max: {
          args: [99],
          msg: `les cp doivent etre au maximum de 99`,
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: `Utilisez une URL pour l'image` },
          notNull: { msg: `L'image est une propriété requise` },
        },
      },
      types: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        get() {
          if (this.getDataValue("types_string") !== undefined) {
            return this.getDataValue("types_string").split(",");
          }
          return this.getDataValue("types");
        },
        set(types) {
          if (Array.isArray(types)) {
            this.setDataValue("types_string", types.join());
          }
          this.setDataValue("types", types);
        },
        validate: {
          notNull: { msg: `Les types sont une propriété requise.` },
          isTypesValid(value) {
            if (!value) {
              throw new Error(`Un pokémon doit au moins avoir un type.`);
            }
            if (!Array.isArray(value)) {
              throw new Error(
                `Le ou les types d'un pokémon doivent être dans un tableau de chaines de caractères.`
              );
            }
            if (value.length > 3) {
              throw new Error(
                `Un pokémon ne peut pas avoir plus de trois types.`
              );
            }
            value.forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit apartenir à la liste suivante : ${validTypes}.`
                );
              }
            });
          },
        },
      },
      // Fin des modifications
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
