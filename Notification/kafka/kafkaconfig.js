import pkg from 'kafkajs'

const { Kafka } = pkg;


export const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['192.168.119.128:9092']
})
