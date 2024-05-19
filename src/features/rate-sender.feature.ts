import { nodemailer } from 'nodemailer'
import { GetRate } from './get-rate.feature'
import { SubscriptionModule } from '../models/subscription.model'

export class RateSender {
  transporter
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  }
  async sendRate (): Promise<void> {
    const getRateFeature = new GetRate()
    const rate = await getRateFeature.getRate()

    const subscriptions = await SubscriptionModule.find()
    for (const subscription of subscriptions) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: subscription.email,
        subject: 'Daily Exchange Rate',
        text: `Current USD to UAH rate is ${rate}`,
      }

      await this.transporter.sendMail(mailOptions)
  }
}
}