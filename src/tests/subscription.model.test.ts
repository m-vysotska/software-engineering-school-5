import mongoose from 'mongoose';
import Subscription from '../models/subscription.model';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Subscription.deleteMany({});
});

describe('Subscription Model', () => {
  it('should create a subscription successfully', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      city: 'London',
      frequency: 'daily' as const,
    };

    const subscription = await Subscription.create(subscriptionData);

    expect(subscription.email).toBe(subscriptionData.email);
    expect(subscription.city).toBe(subscriptionData.city);
    expect(subscription.frequency).toBe(subscriptionData.frequency);
    expect(subscription.createdAt).toBeDefined();
    expect(subscription.updatedAt).toBeDefined();
  });

  it('should not allow duplicate email-city combinations', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      city: 'London',
      frequency: 'daily' as const,
    };

    await Subscription.create(subscriptionData);
    await expect(Subscription.create(subscriptionData)).rejects.toThrow();
  });

  it('should validate email format', async () => {
    const subscriptionData = {
      email: 'invalid-email',
      city: 'London',
      frequency: 'daily' as const,
    };

    await expect(Subscription.create(subscriptionData)).rejects.toThrow(/Invalid email format/);
  });

  it('should validate frequency enum values', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      city: 'London',
      frequency: 'invalid' as 'daily' | 'weekly',
    };

    await expect(Subscription.create(subscriptionData)).rejects.toThrow();
  });

  it('should set default frequency to "daily" if not provided', async () => {
    const subscriptionData = {
      email: 'test@example.com',
      city: 'London',
    };

    const subscription = await Subscription.create(subscriptionData);

    expect(subscription.frequency).toBe('daily');
  });

  it('should trim email and city fields', async () => {
    const subscriptionData = {
      email: '  test@example.com  ',
      city: '  London  ',
      frequency: 'daily' as const,
    };

    const subscription = await Subscription.create(subscriptionData);

    expect(subscription.email).toBe('test@example.com');
    expect(subscription.city).toBe('London');
  });

  it('should lowercase the email field', async () => {
    const subscriptionData = {
      email: 'TEST@example.com',
      city: 'London',
      frequency: 'daily' as const,
    };

    const subscription = await Subscription.create(subscriptionData);

    expect(subscription.email).toBe('test@example.com');
  });
});