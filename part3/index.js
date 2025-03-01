
const express = require('express');
const morgan = require('morgan');

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const app = express();
app.use(express.json());
// app.use(morgan('tiny',{}));

morgan.token('body', (req) => JSON.stringify(req.body)); //by default body wont be parsed

app.use(morgan(':method :url :status - :response-time ms :body')); 
// app.use(morgan)

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/info',(req,res) => {
    const noOfPersons = persons.length;
    const date =  new Date();
    res.send(`<p> Phonebook has info for ${noOfPersons} people </p> <p> ${date} </p>`);
})

app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === id);
    if(person){
        res.json(person);
    } else {
        // res.status(404).end();
        res.sendStatus(404);
    }
})

app.delete('/api/delete/:id', (req,res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);
    if(person){
        persons = persons.filter(person => person.id !== id);
        res.json(persons);
    } else {
        res.sendStatus(404);
    }
})

app.post('/api/persons', (req,res) => {
    const body = req.body
    const id = Math.floor(Math.random() * 1000);
    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'Name or number missing'
        })
    } else if(persons.find(person => person.name === body.name)){
        return res.status(400).json({
            error: 'Name already exists'
        })
    }
    const person = {
        id: id,
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person);
    res.json(persons);
})


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})