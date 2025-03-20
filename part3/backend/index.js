const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

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

const app = express()
app.use(express.json())
// app.use(morgan('tiny',{}));
app.use(cors())
app.use(express.static('dist')) //for serving static files

morgan.token('body', (req) => JSON.stringify(req.body)) //by default body wont be parsed

app.use(morgan(':method :url :status - :response-time ms :body'))
// app.use(morgan)

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/info',(req,res) => {
  const noOfPersons = Person.countDocuments()
  const date =  new Date()
  res.send(`<p> Phonebook has info for ${noOfPersons} people </p> <p> ${date} </p>`)
})

app.get('/api/persons/:id', (req,res,next) => {
  const id = req.params.id
  // const person = Person.find(person => person.id === id);
  // if(person){
  //     res.json(person);
  // } else {
  //     // res.status(404).end();
  //     res.sendStatus(404);
  // }
  Person.findById(id)
    .then(person => { if(person){res.json(person)}
    else {
      res.sendStatus(404).end()
    }
    }).catch(error => next(error))
})

app.delete('/api/persons/delete/:id', (req,res, next) => {
  const id = req.params.id
  // const person = persons.find(person => person.id === id);
  // if(person){
  //     persons = persons.filter(person => person.id !== id);
  //     res.json(persons);
  // } else {
  //     res.sendStatus(404);
  // }
  Person.findByIdAndDelete(id)
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req,res,next) => {
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
  person.save()
    .then(savedPerson => {
      res.json(savedPerson)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (req,res,next) => {
  const id = req.params.id
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(id, person, { new: true }) //if true, return the modified document rather than the original
    .then(updatedPerson => {
      if(updatedPerson){
        res.json(updatedPerson)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req,res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if(error.name === 'CastError'){
    return res.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})