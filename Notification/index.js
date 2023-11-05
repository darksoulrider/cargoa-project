import app from "./app.js";


const PORT = 9003 // notification


app.listen(PORT, () => {
    console.log(`Notification server started on - ${PORT}`)
})