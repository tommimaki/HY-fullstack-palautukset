const Form = (props) => {
  const { newName, handleNameChange, handleNumberChange, number, addPerson } =
    props;
  return (
    <form>
      <div>
        <h5> add new person:</h5>
        name: <input value={newName} onChange={handleNameChange} />
        number: <input value={number} onChange={handleNumberChange} />
      </div>
      <div>
        <button onClick={addPerson}>add</button>
      </div>
    </form>
  );
};

export default Form;
