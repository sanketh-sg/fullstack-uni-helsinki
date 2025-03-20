/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react'
import Search from './Search'
import AddNew from './AddNew'
import axios from 'axios'
import phoneServices from '../services/phoneServices'
import Notification from './Notification'

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
    const [notification, setNotification] = useState({message: null, type: ""})
    // useEffect(() => {
    //     axios
    //         .get('http://localhost:3001/api/persons')
    //         .then(response => {
    //             setPersons(response.data)
    //         })},[])
            
    useEffect(() => {
        phoneServices
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons.data)
            })},[])

    const addPerson = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName);
        if(existingPerson){
            const confirmUpdate = window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new one?`)
            if(confirmUpdate){
                const personObj = {...existingPerson, number: newNumber}
                phoneServices
                    .update(existingPerson.id, personObj)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
                        setNotification({message: `Updated ${response.data.name}`, type: "success"})
                    })
                    .catch(error => {
                        setNotification({message: `Information of ${existingPerson.name} has already been removed from the server`, type: "error"})
                    })
                    setNewName('')
                    setNewNumber('')
            }
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
                setNotification({message: `Added ${response.data.name}`, type: "success"})
            })
            .catch(error => {
                setNotification({message: error.response.data.error, type: "error"})
            })
            setNewName('')
            setNewNumber('')


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
                setNotification({message: `${response.data.name} deleted from the phonebook`, type: "info"})
                //update the state in react
            })
            .catch(error => {
                setNotification({message: `Information of ${name} has already been removed from the server`, type: "error"})
            })
        }
    }

  return (
    <div>
        <h2>Phonebook</h2>
        <br/> 
        <Notification message={notification.message} type={notification.type} />
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