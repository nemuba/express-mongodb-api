const Queue = require('bull');
const DeleteUser = require('../services/delete_user');

const DeletUserJob = new Queue('DeletUserJob', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
  },
});

DeletUserJob.process(async (job, done) => {
  const { userIds } = job.data;

  await userIds.forEach(async (userId) => {
    try{
      await DeleteUser.execute(userId);
    }catch(err){
      done(new Error(err));
    }
  });

  done();
});

module.exports = DeletUserJob
