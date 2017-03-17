'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define("car", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true,
            }
        },
        name: {
            type: DataTypes.STRING(191),
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING(191),
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                this.hasMany(models.Carfeature, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false,
                    },
                });
            }
        }
    });
};
