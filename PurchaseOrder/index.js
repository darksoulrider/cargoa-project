
import app from "./app.js";
import DB_Connect from "./config/DB_connect.js";

const PORT = process.env.PORT || 9002
DB_Connect()

app.listen(PORT, () => {
    console.log(`purchase order -services started - ${PORT}`)
})






