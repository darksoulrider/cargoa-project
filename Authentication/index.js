
import app from "./app.js";
import DB_Connect from "./config/DB_connect.js";

// *********** connect db **************
DB_Connect()
const PORT = process.env.PORT || 9001


// *************** server started listning *********
app.listen(PORT, () => {
    console.log(`Auth - server started : ${PORT}`)
})




