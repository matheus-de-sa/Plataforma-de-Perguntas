const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./db/db')
const Pergunta = require('./db/Pergunta')
const Resposta = require('./db/Resposta')

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


//bodyparser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id','DESC']
    ] }).then((perguntas) => {
        res.render('index', {
            perguntas: perguntas
        })
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then((pergunta) => {
        if (pergunta != undefined) { //Pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'DESC']]
            }).then((respostas) => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        } else { //Pergunta não encontrada
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) => {
    var id = req.body.pergunta
    var body = req.body.body
    Resposta.create({
        perguntaId: id,
        body: body
    }).then(() => {
        res.redirect(`/pergunta/${id}`)
    })
})

app.post('/salvarpergunta', (req, res) => {
    var title = req.body.title
    var description = req.body.description
    Pergunta.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect('/')
    })
})

app.listen(8080, (err) => {
    if (err) {
        console.log('Ocorreu um erro')
    } else {
        console.log('App rodando')
    }
})