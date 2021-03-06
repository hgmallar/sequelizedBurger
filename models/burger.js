module.exports = function(sequelize, DataTypes) {

    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

    Burger.associate = function(models) {
        Burger.belongsTo(models.Eater, {
          foreignKey: {}
        });
      };
   
    return Burger;
};