import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getBlogById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`)

    if (!response.ok) throw new Error('Failed to get a blog from the server!')

    return response.json()
  } catch (error) {
    console.log(error)
  }
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const postComment = async (id, comment) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment)
  }

  try {
    const request = await fetch(`${baseUrl}/${id}/comments`, config)

    if (!request.ok) {
      throw new Error('Failed to post a comment!')
    }

    return request.json()
  } catch (error) {
    console.log(error)
  }
}
const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { setToken, getAll, getBlogById, create, update, postComment, deleteBlog }