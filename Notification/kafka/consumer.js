import { kafka } from "./kafkaconfig.js";
import { order_created } from "./consumer_Controller.js";
export async function setupKafkaConsumer() {
    const consumer = kafka.consumer({ groupId: 'order-group-1' });
    await consumer.connect();

    await consumer.subscribe({ topics: ['mail', 'order'], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            if (topic === 'mail') {
                console.log('received mail..')
            } else if (topic === 'order') {
                const d = message.value.toString()
                await order_created(d)
                console.log('Received a message from the "order" topic:');
            }


        },
    });
}


