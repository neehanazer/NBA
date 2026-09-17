export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  provider: 'dummy' | 'razorpay' | 'counter';
  status: 'created' | 'pending' | 'success';
}

export interface PaymentVerification {
  success: boolean;
  paymentId: string;
  orderId: string;
  error?: string;
}

export interface IPaymentProvider {
  createOrder(amount: number, currency: string, metadata: Record<string, string>): Promise<PaymentOrder>;
  verifyPayment(paymentId: string, orderId: string, signature?: string): Promise<PaymentVerification>;
}

export class DummyPaymentProvider implements IPaymentProvider {
  async createOrder(amount: number, currency: string = 'INR', metadata: Record<string, string> = {}): Promise<PaymentOrder> {
    return {
      orderId: `dummy_ord_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      amount,
      currency,
      provider: 'dummy',
      status: 'created',
    };
  }

  async verifyPayment(paymentId: string, orderId: string): Promise<PaymentVerification> {
    return {
      success: true,
      paymentId: paymentId || `dummy_pay_${Date.now()}`,
      orderId,
    };
  }
}

export class CounterPaymentProvider implements IPaymentProvider {
  async createOrder(amount: number, currency: string = 'INR', metadata: Record<string, string> = {}): Promise<PaymentOrder> {
    return {
      orderId: `counter_ord_${Date.now()}`,
      amount,
      currency,
      provider: 'counter',
      status: 'pending',
    };
  }

  async verifyPayment(paymentId: string, orderId: string): Promise<PaymentVerification> {
    return {
      success: true,
      paymentId: paymentId || `counter_verified_${Date.now()}`,
      orderId,
    };
  }
}

export function getPaymentProvider(providerName?: string): IPaymentProvider {
  const selected = providerName || process.env.PAYMENT_PROVIDER || 'dummy';
  if (selected === 'counter') {
    return new CounterPaymentProvider();
  }
  return new DummyPaymentProvider();
}
