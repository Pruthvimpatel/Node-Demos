const express = require('express');
const { Queue, Worker, QueueScheduler } = require('bullmq');
const Redis = require('ioredis');
const app = express();
const port = 6000;

const redisOptions = {
  host: '127.0.0.1',
  port: 6379,
};

const emailQueue = new Queue('emailQueue', { connection: new Redis(redisOptions) });

const queueScheduler = new QueueScheduler('emailQueue', { connection: new Redis(redisOptions) });

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { email, subject, message } = req.body;
  
  await emailQueue.add('sendEmail', { email, subject, message }, {
    attempts: 3,
    backoff: 5000, 
  });

  res.status(200).send(`Email job created for ${email}`);
});

const worker = new Worker('emailQueue', async (job) => {
  console.log(`Processing job ${job.id} - Sending email to ${job.data.email}`);
  console.log(`Subject: ${job.data.subject}`);
  console.log(`Message: ${job.data.message}`);

  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log(`Email sent to ${job.data.email}`);
  return { status: 'Email sent!' };
}, { connection: new Redis(redisOptions) });

worker.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed successfully: ${result.status}`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed: ${err.message}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
