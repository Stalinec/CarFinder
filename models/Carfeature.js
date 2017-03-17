module.exports = function (sequelize, DataTypes) {

    return sequelize.define("carfeature", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true,
            }
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.Car, {foreignKey: 'carId'});
                this.belongsTo(models.Feature, {foreignKey: 'featureId'});
            }

        }
    });
};
