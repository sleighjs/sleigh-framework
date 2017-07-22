'use strict'

/**
 * GET METHOD
 * @param  {string}   path     Route path 
 * @param  {Function || String} callback Function or string
 * @return void
 */
module.exports.get = function(path, callback) {
    if (callback instanceof Function) {
        app.get(path, function(req, res) {
            callback(req, res);
        });
    } else if (typeof callback == 'string' || callback instanceof String) {
        var split = callback.split('@');
        var controller = split[0];
        var method = split[1];
        app.get(path, require(`../../../controllers/${controller}`)[method]);
    } else {
        throw new Error('Only string or function');
    }
}