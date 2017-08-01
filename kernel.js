var express = require('express');
global.app = express();
global.appRoot = require('app-root-path');
global.util = require('./lib/util');
global.ROUTER = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var validator = require('express-validator');
var mysql = require('mysql');
require('dotenv').config();

/**
 * The kernel of the app
 */
class Kernel {

    /**
     * Constructor
     * @return void
     */
    constructor() {
        this.setUpServer();
    }

    /**
     * Initial Setup of the server
     * @return void
     */
    setUpServer() {
        this.setUpBodyParser(); // Body Parser
        this.setUpRouter(); // Router
        this.setUpStaticPath(); // Static Path (Public)
        this.setUpTemplateEngine(); // Template Engine (Handlebars)
        this.setUpMysql(); // Mysql
    }

    /**
     * Call this function to serve the app
     * @return void
     */
    serve() {
        var port = this.getServerPort();
        app.listen(port, function() {
            console.log(`Server started on http://localhost:${port}`);
        });
    }

    /**
     * Set up Mysql and make a global variable the instance of connection
     * @return void
     */
    setUpMysql() {
        var connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        global.db = connection;
    }

    /**
     * Set up two different kind of routers
     * @return void
     */
    setUpRouter() {
        if (this.getRouter() == 'json') {
            this.setUpJsonRouter();
        } else {
            require(appRoot + '/router/routes.js');
        }
    }

    /**
     * Set Static Path
     * @return void
     */
    setUpStaticPath() {
        app.use(express.static(appRoot + '/public'));
    }

    /**
     * Set Template Engine (handlebars)
     * @return void
     */
    setUpTemplateEngine() {
        app.set('view engine', 'hbs');
        app.set('views', (appRoot + '/views'));
    }

    /**
     * In case of json Router (Setup)
     * @return void
     */
    setUpJsonRouter() {
        var fs = require('fs');
        var obj = JSON.parse(fs.readFileSync(appRoot + '/router/routes.json', 'utf8'));
        obj.routes.forEach(function(el) {
            if (el.method == 'GET') {
                var controller = require(appRoot + '/controllers/' + el.controller.filename);
                app.get(el.path, controller[el.controller.function]);
            }
        });
    }

    /**
     * Body Parser
     * @return void
     */
    setUpBodyParser() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: false
        }));
    }

    /**
     * Establish the connection with mysql
     * @return void
     */
    mysqlConnect() {
        connection.connect(function(err) {
            if (err) throw err;
        });
    }

    /**
     * Setup Validator
     * @return void
     */
    validator() {
        app.use(validator({
            errorFormatter: function(param, msg, value) {
                var namespace = param.split('.'),
                    root = namespace.shift(),
                    formParam = root;

                while (namespace.length) {
                    formParam += '[' + namespace.shift() + ']';
                }
                return {
                    param: formParam,
                    msg: msg,
                    value: value
                };
            }
        }));
    }

    /**
     * GETTER: Mysql connection instance
     * @return {connection}
     */
    getMysqlConnection() {
        return connection;
    }

    /**
     * GETTER: The expressJs instance (server)
     * @return {express}
     */
    getServer() {
        return app;
    }

    /**
     * GETTER: Router preference of the user
     * @return {string}
     */
    getRouter() {
        return process.env.SERVER_ROUTER;
    }

    /**
     * GETTER: Port specified by user
     * @return {string}
     */
    getServerPort() {
        return process.env.SERVER_PORT || 8000;
    }
}

module.exports = Kernel;