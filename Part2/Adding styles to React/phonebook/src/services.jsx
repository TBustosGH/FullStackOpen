import axios from "axios"

const BaseURL = 'http://localhost:3001/persons'

const GetAll = () => {
    const request = axios.get(BaseURL)
    return request.then(response => response.data)
}
const Create = (newObject) => {
    const request = axios.post(BaseURL, newObject)
    return request.then(response => response.data)
}
const Update = (id, newObject) => {
    const request = axios.put(`${BaseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

const Remove = (id) => {
    const request = axios.delete(`${BaseURL}/${id}`)
    return request.then(response => response.data)
}


export default { GetAll, Create, Update, Remove }