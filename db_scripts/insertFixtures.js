'use strict';

//this needs to be loaded because of server
require('dotenv').load();
Promise = require('bluebird');

const Models = require("../models/");
const sequelize_fixtures = require('sequelize-fixtures');

let fixtures = [
    "db_scripts/fixtures/cars.json",
    "db_scripts/fixtures/features.json",
    "db_scripts/fixtures/featureoptions.json",
    "db_scripts/fixtures/carfeatures.json"
];

const insertScript = function () {
  console.log('Start inserting');
    return Models.sequelize.transaction(function (t) {
        var options = {raw: true, transaction: t};
        return Models.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', options)
            .then(() => {
                let truncates = [];
                for (let table of fixtures) {
                    let tableName = table.split('/').pop().replace('s.json', '');
                    console.log("Table name: " + tableName);
                    truncates.push(Models.sequelize.query('truncate table ' + tableName, options));
                }
                return Promise.all(truncates);
            })
            .then(() => sequelize_fixtures.loadFiles(fixtures, Models))
            .then(() => Models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', options))
            .then(function () {
                console.log("Fixtures inserted");
                return true;
            });
    });
};

module.exports = insertScript;
