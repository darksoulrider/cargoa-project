import kafka from "./kafkaConfig"


const producer = kafka.producer()

await producer.connect()
await producer.send({
    topic: 'order-testing',
    messages: [
        { value: 'Hello KafkaJS user for order!' },
    ],
})

await producer.disconnect()