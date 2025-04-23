const fs = require('fs').promises
const path = require('path')
const chalk = require('chalk').default;
const notesPath = path.join(__dirname, 'db.json')


const getNotes = async () => {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []

}

const addNote = async (title) => {
    const notes = await getNotes()

    notes.push({
                   title,
                   id: Date.now().toString()
               })

    await fs.writeFile(notesPath, JSON.stringify(notes))

    console.log(chalk.green.bold.inverse('Note was added'));
}

const printNotes = async () => {
    const notes = await getNotes()

    console.log(chalk.blue.bold.inverse('Here is list of notes'))

    notes.map(note => console.log(chalk.blue(`title: ${note.title}, id: ${note.id}`)))

}

const removeNote = async (id) => {
    const notes = await getNotes()
    const updatedNotes = notes.filter((note) => note.id !== id)

    if (notes.length === updatedNotes.length) {
        return console.log(chalk.red.bold.inverse('Error! Note was not deleted'));
    }

    await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
    console.log(chalk.red.bold.inverse('Note was deleted'));

    await printNotes()
}

const updateNote = async (id, newTitle) => {
    const notes = await getNotes()
    const updatedNotes = notes.map((note) => {
        return note.id === id ? {...note, title: newTitle} : note
    })

    await fs.writeFile(notesPath, JSON.stringify(updatedNotes))
    console.log(chalk.red.bold.inverse('Note was updated'));

    await printNotes()
}


module.exports = {
    addNote, printNotes, removeNote, getNotes, updateNote
}
