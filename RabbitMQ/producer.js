//creating a basic example with a producer that sends a message to a queue and a consumer that listen to a queue and processes the message


const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost',(error,connection) =>{
    if(error) {
        throw error;
    }


    connection.createChannel((error,channel) => {
        if(error) {
            throw error;
        }


        const queue = 'hello';
        const msg = 'hello RabbitMQ';


        channel.assertQueue(queue,{durable:false})

        channel.sendToQueue(queue,Buffer.from(msg));
        console.log("[x] Sent '%s'",msg);
    });

    setTimeout(() => {
        connection.close();
    },500);
});