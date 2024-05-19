import cron from 'cron'
import { RateSender } from '../features/rate-sender.feature'

const job = new cron.CronJob('0 15 * * *', async () => {
  const rateSender = new RateSender()
  await rateSender.sendRate()
}, null, true)

job.start()