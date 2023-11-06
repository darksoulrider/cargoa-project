
import { kafka } from "./kafka.config.js";

async function init() {
    const admin = kafka.admin();

    console.log('Admin connecting...')
    admin.connect()
    console.log('Admin connected')
    console.log("Creating Topic [mail,order] ")

    await admin.createTopics({
        topics: [
            {
                topic: "mail",
                numPartitions: 1,
            },
            {
                topic: "order",
                numPartitions: 4,
            }
        ],
    });
    console.log("Topics created successfully...")

    console.log("Admin disconnecting....")
    await admin.disconnect()
    console.log("Admin diconneted.....")
}

init()