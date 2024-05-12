'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Contato extends Model {
    static associate(models) {
      // define association here
    }
  }

  Contato.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: DataTypes.STRING,
      endereco: DataTypes.STRING,
      telefone: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Contato',
    }
  );

  return Contato;
};
