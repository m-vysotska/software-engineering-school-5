import { SubscriptionModule } from '../models/subscription.model'

export class Subscription {
  async subscribeForRate (email: string): Promise<void> {
    const subscription = new SubscriptionModule({ email });
    await subscription.save()
  }
}
