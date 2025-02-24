import {useEffect, useState} from 'react'
import Search from './Search'
import AddNew from './AddNew'
// import axios from 'axios'
import phoneServices from '../services/phoneServices'
import Person from './Person'

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

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:3001/persons')
    //         .then(response => {
    //             setPersons(response.data)
    //         })},[])
            
    useEffect(() => {
        phoneServices
            .getAll()
            .then(response => {
                setPersons(response.data)
            })},[])

    const addPerson = (event) => {
        event.preventDefault()
        if(persons.find(person => person.name === newName)) {
            let  personObj = persons.find(person => person.name)
            personObj = {...personObj, number: newNumber}

            phoneServices
                .update(personObj.id, personObj)
                .then(response => {
                    setPersons(persons.map(person => person.id !== personObj.id ? person : response.data))
                    setNewName('')
                    setNewNumber('')
                })

            alert(`${newName} is already added to the phonebook replace the old number with a new one?`)
            return
        }

        const personObject = {
            name: newName.trim(),
            number: newNumber.trim()
        }

        phoneServices
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
            })

        // setPersons(persons.concat(personObject))
        // setNewName('')
        // setNewNumber('')
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

    const handleDelete = (id, name) => {
        if(window.confirm(`Delete ${name}?`)) {
            phoneServices.deletePerson(id) //delete from backend not in react
            .then(response => {
                // console.log(response)
                setPersons(persons.filter(person => person.id !== id)) 
                alert(`${response.data.name} deleted from the phonebook`)
                //update the state in react

            })
        }
    }

  return (
    <div>
        <h2>Phonebook</h2>
        <br/> 
        <Search searchName={searchName} handleName={handleName} persons={persons}/>  
        <AddNew newName={newName} newNumber={newNumber} handlePerson={handlePerson} handleNumber={handleNumber} addPerson={addPerson} />

        <h2>Numbers</h2>
        <div>
            {/* { persons.map(person => <div key={person.name}>{person.name} {person.number}</div>) } */}
            { persons.map(person => <Person 
                                        key={person.id} 
                                        name={person.name} 
                                        number={person.number} 
                                        id={person.id} 
                                        handleDelete={() => handleDelete(person.id, person.name)}/>
                            )}
        </div>
    </div>
  )
}

export default Phonebook