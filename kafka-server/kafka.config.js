import pkg from 'kafkajs'

const { Kafka } = pkg;


export const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['192.168.119.128:9092']
})
