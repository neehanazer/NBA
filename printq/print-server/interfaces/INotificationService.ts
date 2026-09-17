export interface PushPayload {
  title: string;
  body: string;
  jobId?: string;
  icon?: string;
  data?: Record<string, any>;
}

export interface INotificationService {
  sendWhatsApp(phoneNumber: string, template: string, params: Record<string, string>): Promise<boolean>;
  sendWebPush(subscription: any, payload: PushPayload): Promise<boolean>;
}
