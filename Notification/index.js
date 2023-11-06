import app from "./app.js";
import DB_Connect from "./config/Connect_DB.js";
import { setupKafkaConsumer } from "./kafka/consumer.js";
const PORT = 9003 // notification

DB_Connect()
try {
    setupKafkaConsumer()
} catch (err) {
    console.log(`Kaka Error: ${err.message}`)
}


app.listen(PORT, () => {
    console.log(`Notification server started on - ${PORT}`)
})