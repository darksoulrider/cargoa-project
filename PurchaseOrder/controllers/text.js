// ! later delte this file

import axios from "axios";


const data = axios.get("http://localhost:9002/api/vendorinfo", {
    userid: 'vendor1@gmail.com'
})