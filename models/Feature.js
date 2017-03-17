'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define("feature", {
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
        expectedValue: {
            type: DataTypes.STRING(191),
            allowNull: false,
            defaultValue: 'STRING'
        },
        unit: {
            type: DataTypes.STRING(191),
            allowNull: true,
        },
        apiAiId: {
            type: DataTypes.STRING(191),
            allowNull: true,
        },
    }, {
        classMethods: {
            associate: function (models) {
                this.hasMany(models.Featureoption, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false,
                    },
                });
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
