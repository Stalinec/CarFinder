'use strict';

var Sequelize = require('sequelize');
const JSONbig = require('json-bigint');

/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|{}}
 */
module.exports = function (sequelize, DataTypes) {

    return sequelize.define("session", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true,
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            validate: {}
        },
        uuid: {
            type: DataTypes.UUID,
            unique: true,
            defaultValue: Sequelize.UUIDV1,
            validate: {
                notEmpty: true,
            }
        },
        contexts: {
            type: DataTypes.TEXT,
            //defaultValue: JSONbig.stringify([]),
            validate: {},
            get: function () {
                var val = this.getDataValue('contexts');
                if (val)
                    return JSONbig.parse(val);
                else
                    return [];
            },
            set: function (val) {
                this.setDataValue('contexts', JSONbig.stringify(val));
            }
        },
        searchConditions: {
            type: DataTypes.TEXT,
            //defaultValue: JSONbig.stringify([]),
            validate: {},
            get: function () {
                var val = this.getDataValue('contexts');
                if (val)
                    return JSONbig.parse(val);
                else
                    return [];
            },
            set: function (val) {
                this.setDataValue('contexts', JSONbig.stringify(val));
            }
        },
    }, {
        classMethods: {
            associate: function (models) {
                this.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false,
                    }
                });
                this.hasMany(models.Message, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false,
                    },
                });
            }
        }
    });
};
