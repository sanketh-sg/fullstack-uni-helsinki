import {useEffect, useState} from 'react'
import Search from './Search'
import AddNew from './AddNew'
import axios from 'axios'

function Phonebook() {

    // const [persons, setPersons] = useState([
    //     { name: 'Arto Hellas', number: '040-123456', id: 1 },
    //     { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    //     { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    //     { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    // ])
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchName, setSearchName] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })},[])
            
    const addPerson = (event) => {
        event.preventDefault()
        if(persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to the phonebook`)
            return
        }

        const personObject = {
            name: newName.trim(),
            number: newNumber.trim()
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const handlePerson = (event) => {
        setNewName(event.target.value)
        // setNewNumber(event.target.value)
    }

    const handleNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleName = (event) => {
        setSearchName(event.target.value)
    }


  return (
    <div>
        <h2>Phonebook</h2>
        <br/> 
        <Search searchName={searchName} handleName={handleName} persons={persons}/>  
        <AddNew newName={newName} newNumber={newNumber} handlePerson={handlePerson} handleNumber={handleNumber} addPerson={addPerson} />

        <h2>Numbers</h2>
        <div>
            { persons.map(person => <div key={person.name}>{person.name} {person.number}</div>) }
        </div>
    </div>
  )
}

export default Phonebook