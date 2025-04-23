// const fs = require('fs').promises
// const http = require('http')
const express = require('express')
const chalk = require('chalk').default;
const path = require('path')
const {addNote, getNotes, removeNote, updateNote} = require(('./notes.controller'))

const PORT = 3000

const basePath = path.join(__dirname, 'pages')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded(
    {
        extended: true
    }))

app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.post('/', async (req, res) => {
    await addNote(req.body.title)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true
    })
})

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.patch('/:id', async (req, res) => {
    await updateNote(req.params.id, req.body.title)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})


app.listen(PORT, () => {
    console.log(chalk.green.bold.inverse(`Server has been started on port ${PORT}...`))
})
