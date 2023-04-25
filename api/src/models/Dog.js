const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_height: {
      type: DataTypes.STRING,
      allowNull:false, 
    },
    max_height: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    min_weight: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    max_weight: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    life_span: {
      type: DataTypes.STRING,
    },
    image:{
      type: DataTypes.STRING,
      allowNull:true 
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true 
    }
   
  },
    {
    timestamps: false

  });
};
