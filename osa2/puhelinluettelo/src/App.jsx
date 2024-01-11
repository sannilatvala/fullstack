import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    
    personService
      .deleteObject(id)
      .then(response => {
        console.log(`deleted ${id}`)
        setPersons(persons.filter(person => person.id !== id))
        setMessage(
          `Deleted ${person.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const addPerson = (event) => {
    const addNewNumber = () => {
      const existingPerson = persons.find(person => person.name === newName)

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber}

      personService
        .update(existingPerson.id, updatedPerson)
        .then(response => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Changed number for ${existingPerson.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${existingPerson.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
      }
    }

    event.preventDefault()

    if (persons.find((person) => person.name === newName)) {
      addNewNumber()
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
      }
  }
  
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleShowPersonChange = (event) => {
    setShowPerson(event.target.value)
  }

  const personsToShow = showPerson
    ? persons.filter(person => person.name.toLowerCase().includes(showPerson.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type="message" />
      <Notification message={error} type="error" />

      <Filter value={showPerson} onChange={handleShowPersonChange} /> 

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <ul>
        {personsToShow.map(person => 
            <Person
              key={person.id}
              person={person}
              deletePerson={deletePerson}
            />
          )}
      </ul>
    </div>
  )
}

export default App
