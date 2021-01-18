var appRoot = require('app-root-path');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
    throw result.error;
}
const { parsed: env } = result;

module.exports = function (app) {

    var config = {
        "pg": {
            "user": env.PG_USER,
            "host": env.PG_HOST,
            "database": env.PG_DATABASE,
            "password": env.PG_PASSWORD,
            "port": env.PG_PORT,
            "debug": env.PG_DEBUG
        }
    };


    if (process.env.NODE_ENV == 'prod') {
        config["pg"] = {
            "user": env.PG_USER,
            "host": env.PG_HOST,
            "database": env.PG_DATABASE,
            "password": env.PG_PASSWORD,
            "port": env.PG_PORT,
            "debug": env.PG_DEBUG
        }
    }
    return config;

}