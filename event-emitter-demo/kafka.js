const { Kafka } = require('kafkajs');

async function runKafkaDemo() {
    // Configuration for Kafka
    const kafka = new Kafka({
        clientId: 'demo-producer',
        brokers: ['localhost:9092']
    });

    // Producing a message to topic
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
        topic: 'test-topic',
        messages: [
            { value: 'Hello Kafka user!' },
        ],
    });

    await producer.disconnect();

    // Create consumer
    const consumer = kafka.consumer({ groupId: 'test-group' });
    await consumer.connect();

    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: message.value.toString(),
            });
        },
    });
}

// Execute the Kafka demo
runKafkaDemo().catch(console.error);
