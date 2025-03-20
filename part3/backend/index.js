
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');

// const persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

const app = express();
app.use(express.json());
// app.use(morgan('tiny',{}));
app.use(cors())
app.use(express.static('dist')); //for serving static files

morgan.token('body', (req) => JSON.stringify(req.body)); //by default body wont be parsed

app.use(morgan(':method :url :status - :response-time ms :body')); 
// app.use(morgan)

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    })
})

app.get('/info',(req,res) => {
    const noOfPersons = Person.countDocuments();
    const date =  new Date();
    res.send(`<p> Phonebook has info for ${noOfPersons} people </p> <p> ${date} </p>`);
})

app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id
    // const person = Person.find(person => person.id === id);
    // if(person){
    //     res.json(person);
    // } else {
    //     // res.status(404).end();
    //     res.sendStatus(404);
    // }
    Person.findById(id)
            .then(person => { if(person){res.json(person);} 
            else {
            res.sendStatus(404).end();
        }
    }).catch(error => {
        console.log(error);
        res.sendStatus(500).end();
    })
})

app.delete('/api/persons/delete/:id', (req,res) => {
    const id = req.params.id;
    // const person = persons.find(person => person.id === id);
    // if(person){
    //     persons = persons.filter(person => person.id !== id);
    //     res.json(persons);
    // } else {
    //     res.sendStatus(404);
    // }
    Person.findByIdAndDelete(id)
            .then(result => {
                res.json(result);
            })
            .catch(error => {
                res.sendStatus(404);
            })
})

app.post('/api/persons', (req,res) => {
    const body = req.body
    // const id = Math.floor(Math.random() * 1000);
    // if(!body.name || !body.number){
    //     return res.status(400).json({
    //         error: 'Name or number missing'
    //     })
    // } else if(persons.find(person => person.name === body.name)){
    //     return res.status(400).json({
    //         error: 'Name already exists'
    //     })
    // }
    // const person = {
    //     id: id,
    //     name: body.name,
    //     number: body.number
    // }
    // persons = persons.concat(person);
    // res.json(persons);

    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'Name or number missing'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        res.json(savedPerson);
    })
})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})