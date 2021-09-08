const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', 'soufoda', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection