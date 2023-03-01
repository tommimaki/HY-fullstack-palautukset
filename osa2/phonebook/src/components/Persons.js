const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <div>
      <h1> list here</h1>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <p>
            {" "}
            {person.name} {person.number}
          </p>
          <button
            onClick={() => {
              deletePerson(person);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};
export default Persons;
