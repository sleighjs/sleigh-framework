'use strict'

var util = exports = module.exports = {};
const i = require('inflect');
const fs = require('fs');

/**
 * Get the table name for the Model
 * @param  {Object} Model
 * @return {String}
 */
util.getTableName = function(Model) {
    let modelName = Model.name
    modelName = i.pluralize(modelName)
    return i.underscore(modelName)
}

/**
 * Replace snippet tags in new Model files
 * @param  {String} file   Path of the file
 * @param  {String} name   Name of the file
 * @return void
 */
util.mysql_replaceModelSnippets = function(file, name) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/__name__/g, name);

        fs.writeFile(file, result, 'utf8', function(err) {
            if (err) return console.log(err);
        });
    });
}