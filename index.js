const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./db/db')

//db

connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados')
    })
    .catch((err) => {
        console.log(err)
    })

//Dizendo ao Express usar o EJS como view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/salvarpergunta', (req, res) => {
    var title = req.body.title
    var description = req.body.description
    res.send('Formulário Recebido' + title + description)
})

app.listen(8080, (err) => {
    if (err) {
        console.log('Ocorreu um erro')
    } else {
        console.log('App rodando')
    }
})