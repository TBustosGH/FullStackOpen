import axios from "axios"
const baseURL = '/api/notes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const GetAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}
const Create = async (newObject) => {
    const config = {
        headers: { Authorization: token}
    }
    const response = await axios.post(baseURL, newObject, config)
    return response.data
}

const Update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}


export default { GetAll, Create, Update, setToken }