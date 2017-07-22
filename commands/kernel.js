const Printer = require('./printer');
const fs = require('fs');
const path = require('path');
const util = require('../lib/util');

class Commander extends Printer {

    /**
     * Create the model file
     * @param  {String} name
     * @return void
     */
    createModel(name) {
        var src = path.join(__dirname, '../snippets/mysql_model.js');
        var dest = path.join(__dirname, '../../models/' + name + '.js');

        this.createFile(src, dest);
        util.mysql_replaceModelSnippets(dest, name);
    }

    /**
     * Create the controller file
     * @param  {String} name
     * @return void
     */
    createController(name) {
        var src = path.join(__dirname, '../snippets/controller.js');
        var dest = path.join(__dirname, '../../controllers/' + name + '.js');

        this.createFile(src, dest);
    }

    /**
     * Copy the temp file to the proper directory
     * @param  {String} src  Source File
     * @param  {String} dest Destination File
     * @return void
     */
    createFile(src, dest) {
        try {
            fs.createReadStream(src).pipe(fs.createWriteStream(dest));
            this.success('Done')
        } catch (e) {
            this.error(e);
        }
    }
}

module.exports = Commander;