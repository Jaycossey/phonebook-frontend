import { useEffect, useState } from 'react';
import Search from './components/Search';
import Form from './components/Form';
import List from './components/List';
import Alert from './components/Alert';
import Error from './components/Error';
import './App.css';
// import axios from 'axios';
import personService from '../services/persons';

const App = () => {
  // state management for person array and onchange input
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchParam, setSearchParam] = useState('');
  const [filterResults, setFilterResults] = useState([]);
  const [persons, setPersons] = useState([]);
  const [alertMessage, setAlertMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  // fetch on initial component render
  useEffect(() => {
    personService.fetchData()
      .then(res => {
        setPersons(res);
      })
  }, []);

  // trigger re-render to update front end phonebook list
  useEffect(() => {
    personService.fetchData()
      .then(res => {
        setPersons(res);
      })
  }, [errorMessage, alertMessage]);

  // handle name submission
  const handleSubmit = () => {
    // prevent refresh of page
    event.preventDefault();

    // bool to check if name exists
    let checkExist = false;
    // for each person in book, check exists
    persons.forEach((person) => {
      if (person.name == newName) {
        checkExist = true;
        window.confirm(`Are you sure you want to update ${newName}?`)
        personService.updatePerson(person.id, {name: newName, number: newNumber});
        setAlertMessage(`Updated ${newName}'s details`);
        setTimeout(() => {
          setAlertMessage();
        }, 4000)
      }
    });

    // if exists then return from function
    if(checkExist) {
      return;
    } else {
      let personObj = {name: newName, number: newNumber};
      // else set new name & number
      setPersons(
        [...persons, personObj]
      )
      personService.addPerson(personObj);
      setAlertMessage(`Added ${newName} to phonebook`);
      setTimeout(() => {
        setAlertMessage();
      }, 4000);
    }
    return;
  }
  
  
  // set newName to be current input
  const handleChange = (name) => {
    setNewName(name);
  }

  // update phone number on input change
  const handleNumberChange = (number) => {
    setNewNumber(number);
  }

  // search and filter for names
  const handleSearch = (name) => {
    setSearchParam(name);
    
    setFilterResults(persons.filter((person) => person.name.toLowerCase().includes(name.toLowerCase())));

    return;
  }

  // delete person from phonebook
  const deletePerson = (id) => {
    window.confirm(`Are you sure you want to delete?`);
    setErrorMessage(`Deleted from server`);
    personService.deletePerson(id);
    setTimeout(() => {
      setErrorMessage();
    }, 4000)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Alert message={alertMessage} />
      <Error message={errorMessage} />
      <Search searchParam={searchParam} handleSearch={handleSearch} filterResults={filterResults} />

      <Form handleSubmit={handleSubmit} newName={newName} handleChange={handleChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>

      <List onClick={deletePerson} persons={persons} />
      
    </div>
  )
}

export default App
