const knex = require('knex');//importando o knex

const configuration = require('../../knexfile');//importando o knexfile

const connection = knex(configuration.development);
// passa a configuração do knexfile


module.exports = connection;