import axios from "axios";


// !  this always chack the url for the specific service
export const Axios_Auth = axios.create({
    baseURL: "http://localhost:9001/api"
})

export const Axios_Order = axios.create({
    baseURL: "http://localhost:9002/api"
})


