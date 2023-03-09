import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personService from "./services/persons";
import StatusMsg from "./components/StatusMsg";
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
  const [status, setStatus] = useState({ msg: null, err: false });

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleStatusText = (message, error) => {
    setStatus({ msg: message, err: error });
    setTimeout(() => {
      setStatus({ msg: null, err: false });
    }, 5000);
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
            handleStatusText(
              `Updated ${existingPerson.name}'s phone number`,
              false
            );
            setNewName("");
            setNumber("");
          })
          .catch((error) => {
            handleStatusText(error.response.data.error, true);
            console.log(error);
          });
      }
    } else {
      personService
        .create(personObject)
        .then((returnedPerson) => {
          handleStatusText(`Added ${personObject.name} to phonebook`, false);
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNumber("");
        })
        .catch((error) => {
          handleStatusText(error.response.data.error, true);
        });
    }
  };

  const handleDeletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          const updatedPersons = persons.filter((p) => p.id !== person.id);
          setPersons(updatedPersons);
        })
        .then(() =>
          handleStatusText(`Removed ${person.name} from phonebook`, false)
        )
        .catch((error) =>
          handleStatusText(
            `${person.name} has already been removed from the server`,
            true
          )
        );
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
      <StatusMsg status={status} />
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
