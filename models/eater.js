module.exports = function (sequelize, DataTypes) {

    var Eater = sequelize.define("Eater", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Eater.associate = function(models) {
        Eater.hasMany(models.Burger);
    };

    return Eater;
};