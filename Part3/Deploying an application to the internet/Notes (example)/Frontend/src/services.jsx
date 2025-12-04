import axios from "axios"
const baseURL = 'http://localhost:3001/api/notes'

const GetAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}
const Create = (newObject) => {
    const request = axios.post(baseURL, newObject)
    return request.then(response => response.data)
}

const Update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}


export default { GetAll, Create, Update }