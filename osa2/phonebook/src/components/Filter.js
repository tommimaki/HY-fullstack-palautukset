const Filter = ({ search, handleSearch }) => {
  return (
    <div>
      filter: <input value={search} onChange={handleSearch} />
    </div>
  );
};
export default Filter;
