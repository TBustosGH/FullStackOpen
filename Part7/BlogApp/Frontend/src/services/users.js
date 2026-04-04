import axios from 'axios'
const baseUrl = '/api/users'

export const getUsers = async () => {
    try {
        const response = await fetch(baseUrl)

        if (!response.ok) throw new Error('Failed to get users from server!')

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
export const getUserById = async ({ id }) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`)

        if (!response.ok) throw new Error('Failed to get user from server!')

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

