'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define("featureoption", {
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
            unique: true,
            allowNull: false
        },
        lowerBound: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        upperBound: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        equal: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        clicks: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        classMethods: {
            associate: function (models) {
                this.hasMany(models.Carfeature, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: true,
                    },
                });
                this.belongsTo(models.Feature, {foreignKey: 'featureId'})
            }
        }
    });
};
