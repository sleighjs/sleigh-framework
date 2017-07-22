let BaseModel = require('./BaseModel');
var res = null;

class Elf extends BaseModel {

    /**
     * Get all the records
     * @return {array} An array of all records
     */
    static all() {
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
}

exports = module.exports = Elf;