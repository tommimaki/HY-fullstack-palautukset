import axios from "axios";
const baseUrl = "api/persons";
// const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => {
    console.log(response.data);
    return response.data;
  });
};

const create = (newObject) => {
  console.log(newObject);
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id} `);
  return request.then((response) => response.data);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, deletePerson };
