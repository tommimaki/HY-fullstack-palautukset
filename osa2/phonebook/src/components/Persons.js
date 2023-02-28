const Persons = ({ filteredPersons }) => {
  return (
    <div>
      <h1> list here</h1>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {" "}
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};
export default Persons;
