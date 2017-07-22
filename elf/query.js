'use strict';

var builder = {

    /**
     * Query to fetch everything from the table
     * @param  {String} table The name of the table
     * @return {String}       Query ready to use
     */
    all: function(table) {
        return `SELECT * from ${table}`;
    }
}

exports = module.exports = builder;