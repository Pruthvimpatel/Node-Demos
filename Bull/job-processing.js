//Bull is a Node library  that implements a fast and robust queue system based on redis
//Bull allow you to schedule and manages background jobs like sending emails, sending push notifications and more.
const express = require('express');
const Queue = require('bull');
const app = express();
const port = 3000;


const emailQueue = new Queue('email', {
  redis: { port: 6379, host: '127.0.0.1' },
});

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { email, subject, message } = req.body;
  
const job = await emailQueue.add({ email, subject, message });
res.status(200).send(`Job created with ID: ${job.id}`);
});

emailQueue.process(async (job) => {
  console.log(`Sending email to: ${job.data.email}`);
  console.log(`Subject: ${job.data.subject}`);
  console.log(`Message: ${job.data.message}`);

  return { status: 'Email sent!' };
});

emailQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result: ${result.status}`);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
