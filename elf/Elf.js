let BaseModel = require('./BaseModel');

class Elf extends BaseModel {

    /**
     * Get all the records
     * 
     * @return {array} An array of all records
     */
    static all() {
        var res = null;

        BaseModel.fetchAll(this.table, function(resp) {
            res = resp;
        });

        var queue = function() {
            if (typeof res !== "null") {
                return res;
            } else {
                setTimeout(queue, 30);
            }
        }

        return queue;
    }

    /**
     * Fetch all the records that satisfies the where clause
     * 
     * @param  {string} col      Name of the column
     * @param  {string} operator Where operator ('LIKE', '=')
     * @param  {string} query    
     * @return {array}          An array of records
     */
    static where(col, operator, query) {
        var res = null;

        BaseModel.where(this.table, function(resp) {
            res = resp;
        }, col, operator, query);

        var queue = function() {
            if (typeof res !== "null") {
                return res;
            } else {
                setTimeout(queue, 30);
            }
        }

        return queue;
    }
}

exports = module.exports = Elf;