import Bee from 'bee-queue';
import CancellationsMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationsMail];

class Queue {
  constructor() {
    this.queues = {};
    if (process.env.NODE_ENV !== 'test') {
      this.init();
    }
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save(); // coloca o trabalho da fila em backgroud
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailed).process(handle);
    });
  }

  handleFailed(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
