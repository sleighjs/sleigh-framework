var chalk = require('chalk');

class Printer {

    /**
     * Just Print out the message
     * @param  {String} message
     * @param  {Array} style   Custom style
     * @return void
     */
    text(message, style = null) {
        if (style) {
            var array = style.split('|');
            var customStyle = chalk;
            array.forEach(function(element) {
                customStyle = customStyle[element];
            });
            console.log(customStyle(message));
        } else {
            console.log(chalk(message));
        }
    }

    /**
     * Print Error Message
     * @param  {String} message
     * @param  {Array} style   Custom style
     * @return void
     */
    error(message, style = null) {
        if (style) {
            var array = style.split('|');
            var customStyle = chalk;
            array.forEach(function(element) {
                customStyle = customStyle[element];
            });
            console.log(customStyle.red(message));
        } else {
            console.log(chalk.red(message));
        }
    }

    /**
     * Print Success Message
     * @param  {String} message
     * @param  {Array} style   Custom style
     * @return void
     */
    success(message, style = null) {
        if (style) {
            var array = style.split('|');
            var customStyle = chalk;
            array.forEach(function(element) {
                customStyle = customStyle[element];
            });
            console.log(customStyle.green(message));
        } else {
            console.log(chalk.green(message));
        }
    }

    /**
     * Print Info Message
     * @param  {String} message
     * @param  {Array} style   Custom style
     * @return void
     */
    info(message, style = null) {
        if (style) {
            var array = style.split('|');
            var customStyle = chalk;
            array.forEach(function(element) {
                customStyle = customStyle[element];
            });
            console.log(customStyle.blue(message));
        } else {
            console.log(chalk.blue(message));
        }
    }

    /**
     * Print Warning Message
     * @param  {String} message
     * @param  {Array} style   Custom style
     * @return void
     */
    warning(message, style = null) {
        if (style) {
            var array = style.split('|');
            var customStyle = chalk;
            array.forEach(function(element) {
                customStyle = customStyle[element];
            });
            console.log(customStyle.yellow(message));
        } else {
            console.log(chalk.yellow(message));
        }
    }
}

module.exports = Printer;