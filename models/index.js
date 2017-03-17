'use strict';

const DBConfig = require("../config/db");

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.ENV;
var db = {};

var sequelize = new Sequelize(DBConfig[env].database, DBConfig[env].username, DBConfig[env].password, {
    host: DBConfig[env].server,
    port: DBConfig[env].port,
    logging: false,
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        timestamps: true, //createdAt, updatedAt
        paranoid: true, //deletedAt
        freezeTableName: true, //keep tablenames like specified in define()
    }
});

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
        var model = sequelize['import'](path.join(__dirname, file));
        var modelIndex = model.name.charAt(0).toUpperCase() + model.name.slice(1);
        db[modelIndex] = model;
    });

//make associate
Object.keys(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
