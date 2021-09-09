const Sequelize = require('sequelize')
const connection = require('./db')

const Resposta = connection.define('respostas', {
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{/*json vazio}*/})

// Não força a criação da tabela

Resposta.sync({force: false}).then(()=> {
    console.log('Tabela Resposta Criada')
})

module.exports = Resposta