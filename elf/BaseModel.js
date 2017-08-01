var queryBuilder = require('./query');

class BaseModel {

    /**
     * Fetch all records
     * @param  {string}   tableName
     * @param  {Function} callback
     * @return {void}
     */
    static fetchAll(tableName, callback) {
        db.query(queryBuilder.all(tableName), function(error, result, fields) {
            if (error) throw (error);
            callback(result);
        });
    }

    /**
     * Fetch all the records that satisfies the where clause
     * 
     * @param  {string}   tableName
     * @param  {Function} callback 
     * @param  {string}   col       Name of the column
     * @param  {string}   operator  Where operator ('LIKE', '=')
     * @param  {string}   query    
     * @return {void}
     */
    static where(tableName, callback, col, operator, query) {
        db.query(queryBuilder.where(tableName, col, operator, query), function(error, result, fields) {
            if (error) throw (error);
            callback(result);
        });
    }

    /**
     * GETTER: Table name
     * @return {String} Name of the table
     */
    static get table() {
        return util.getTableName(this);
    }
}

exports = module.exports = BaseModel;