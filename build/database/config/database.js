"use strict";
var config = {
    database: process.env.ENV_DATABASE || 'localDB',
    password: process.env.ENV_PASSWORD || 'password',
    host: process.env.ENV_HOST || 'localhost',
    username: process.env.ENV_USER || 'random',
    port: Number(process.env.ENV_PORT) || 3101,
    dialect: 'mysql'
};
module.exports = config;
