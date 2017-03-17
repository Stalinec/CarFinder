'use strict';

module.exports = function (sequelize, DataTypes) {

    return sequelize.define("message", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        raw: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        inbound: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        }
    }, {
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.Session, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false,
                    }
                });
                this.belongsTo(models.Template, {
                    onDelete: 'RESTRICT',
                });
            }
        }
    });
};
