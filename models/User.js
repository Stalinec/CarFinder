'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        messengerId: {
            type: DataTypes.STRING(191),
            unique: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING(191),
        },
        lastName: {
            type: DataTypes.STRING(191),
        },
        profilePicUrl: {
            type: DataTypes.TEXT,
        },
        locale: {
            type: DataTypes.STRING(191),
        },
        timezone: {
            type: DataTypes.INTEGER,
        },
        gender: {
            type: DataTypes.STRING(191),
        },
        activeAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW,
        },
    }, {
        classMethods: {
            associate: function (models) {
                this.hasMany(models.Session, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false,
                    },
                });
            }
        }
    });
};
