'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define("template", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        raw: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        classMethods: {
            associate: function (models) {
                this.hasMany(models.Message, {
                    onDelete: 'RESTRICT',
                });
            }
        }
    });
};