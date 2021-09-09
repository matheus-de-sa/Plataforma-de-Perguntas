const Sequelize = require('sequelize')
const connection = require('./db')

const Pergunta = connection.define('perguntas', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
},{/*json vazio}*/})

// Não força a criação da tabela

Pergunta.sync({force: false}).then(()=> {
    console.log('Tabela Criada')
})

module.exports = Pergunta