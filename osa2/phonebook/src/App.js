import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  console.log("render", persons.length, "notes");

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: number,
      id: persons.length + 1,
    };

    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, update number?`
        )
      );
      {
        const existingPerson = persons.find(
          (person) => person.name === personObject.name
        );
        personService
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNumber("");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNumber("");
      });
    }
  };

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService.deletePerson(person.id).then(() => {
        const updatedPersons = persons.filter((p) => p.id !== person.id);
        setPersons(updatedPersons);
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <Form
        newName={newName}
        handleNameChange={handleNameChange}
        number={number}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Persons</h2>
      <Persons
        filteredPersons={filteredPersons}
        deletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
