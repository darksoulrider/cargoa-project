const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'order-service',
    brokers: ['kafka1:9092', 'kafka2:9092'],
})

export default kafka;