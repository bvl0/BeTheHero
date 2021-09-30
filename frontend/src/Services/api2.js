import axios from 'axios';

const api2 = axios.create({
    baseURL: 'http://localhost:1337',
})

export default api2;