"use strict";
var config = {
    database: process.env.ENV_DATABASE || 'ruytter',
    password: process.env.ENV_PASSWORD || 'password',
    host: process.env.ENV_HOST || 'db',
    username: process.env.ENV_USER || 'root',
    port: Number(process.env.ENV_PORT) || 3306,
    dialect: 'mysql'
};
module.exports = config;
