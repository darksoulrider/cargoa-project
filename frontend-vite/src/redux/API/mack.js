import axios from "axios";


const sendSc = async () => {
    const data = {
        mack: "dta"
    }

    try {

        const re = await axios.post('http://localhost:9002/api/vendor/order/offerschedule/65448dd4f4780c41150696e5', data, {
            headers: {
                Authorization: "token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQzYjQ1YWQzMGMxYjE3ZTUwMTg0ZTEiLCJlbWFpbCI6InZlbmRvcjFAZ21haWwuY29tIiwidXNlcnR5cGUiOiJ2ZW5kb3IiLCJpYXQiOjE2OTg5OTU3ODksImV4cCI6MTY5OTQyNzc4OX0.PnDIBxRep7HM9ObxJsENDgguWDP1WiX0GavPD42al3Q"
            }
        })


        console.log(re.data)
    } catch (error) {
        console.log(error)

    }
}
sendSc()