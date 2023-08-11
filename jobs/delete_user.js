const Queue = require('bull');

const DeletUserJob = new Queue('DeletUserJob', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
});

DeletUserJob.process(async (job, done) => {
  const { userIds } = job.data;

  await userIds.forEach((userId) => {
    setTimeout(() => {
      console.debug('DeletUserJob', userId);
    }, 3000);
  });

  done();
});

module.exports = DeletUserJob
