
import app from "./app.js";


const PORT = process.env.PORT || 9002


app.listen(PORT, () => {
    console.log(`Users-services started - ${PORT}`)
})






