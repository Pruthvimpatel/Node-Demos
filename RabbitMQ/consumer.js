const amqp = require('amqplib/callback_api');

// Connect to RabbitMQ server
amqp.connect('amqp://localhost', (error, connection) => {
    if (error) {
        throw error;
    }

    // Create channel
    connection.createChannel((error, channel) => {
        if (error) {
            throw error;
        }

        const queue = 'hello';

        // Ensure the queue exists before receiving the message
        channel.assertQueue(queue, { durable: false });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        // Consume messages from the queue
        channel.consume(queue, (msg) => {
            console.log(" [x] Received '%s'", msg.content.toString());
        }, { noAck: true });
    });
});
