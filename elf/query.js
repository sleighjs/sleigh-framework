'use strict';

var builder = {

    /**
     * Query to fetch everything from the table
     * 
     * @param  {String} table Name of the table
     * @return {String}       Query ready to use
     */
    all: function(table) {
        return `SELECT * from ${table}`;
    },

    /**
     * Query to fetch everything from the table that satisfies the where clause
     * 
     * @param  {string} table    Name of the table
     * @param  {string} col      Name of the column
     * @param  {string} operator Where operator ('LIKE', '=')
     * @param  {string} query    
     * @return {string}          MySQL query
     */
    where: function(table, col, operator, query) {
        var condition = '';
        if (operator == 'LIKE') {
            condition = `${col} LIKE '%${query}%'`;
        } else {
            condition = `${col} = '${query}'`;
        }

        return `SELECT * from ${table} where ${condition}`;
    }
}

exports = module.exports = builder;