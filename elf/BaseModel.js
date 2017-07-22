var queryBuilder = require('./query');

class BaseModel {

    /**
     * Fetch all records
     * @param  {String}   tableName
     * @param  {Function} callback
     * @return void
     */
    static fetchAll(tableName, callback) {
        db.query(queryBuilder.all(tableName), function(error, result, fields) {
            if (error) reject(error);
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