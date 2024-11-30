import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.BACKEND_URL,
})

export {
    $host,
}
