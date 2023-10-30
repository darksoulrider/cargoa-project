
import app from "./app.js";
import DB_Connect from "./config/DB_connect.js";


DB_Connect()
const PORT = process.env.PORT || 9001



app.listen(PORT, () => {
    console.log(`Auth - server started : ${PORT}`)
})




