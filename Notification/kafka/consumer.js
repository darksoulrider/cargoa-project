import kafka from "./kafkaconfig";

const consumer = kafka.consumer({ groupId: 'test-oprder-group' })

await consumer.connect()
await consumer.subscribe({ topic: 'order-testing', fromBeginning: true })

await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            value: message.value.toString(),
        })
    },
})