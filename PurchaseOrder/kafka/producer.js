
import { kafka } from "./kafkaConfig.js"

const producer = kafka.producer();

export const produceMessage = async (topic, message) => {
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [
            {
                key: 'order-created',
                partition: 0,
                value: JSON.stringify(message),
            },
        ],

    })
    await producer.disconnect();
}



// ************ testing **************
// const msg = {
//     userid: "mackgamil.com",
//     orderid: "dlkjfasjdfj324234123",
//     vendorid: "vendor@gmail.com"
// }
// produceMessage('order', msg)