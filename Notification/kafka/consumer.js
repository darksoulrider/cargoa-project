import { kafka } from "./kafkaconfig.js";
import { confirmSchedule, order_created, vendorSchedule } from "./consumer_Controller.js";
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
                const res = JSON.parse(d)


                if (res.key == 'confirm-order') {
                    await confirmSchedule(d)
                    console.log('confirm order called.')

                } else if (res.key == 'vendor-schedule') {
                    await vendorSchedule(d)
                }
                else if (res.key == 'order-create') {
                    await order_created(d)
                } else {
                    console.log(`Not matched - ${res.key}`)
                }
                console.log('Received a message from the "order" topic:');
            }


        },
    });
}


