import webpush from 'web-push';
import { INotificationService, PushPayload } from '../interfaces/INotificationService';

export class NotificationService implements INotificationService {
  private whatsappToken: string | undefined;
  private whatsappPhoneId: string | undefined;

  constructor() {
    this.whatsappToken = process.env.WHATSAPP_API_TOKEN;
    this.whatsappPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    const vapidPublic = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
    const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:support@collegeprintq.edu';

    if (vapidPublic && vapidPrivate) {
      webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate);
    }
  }

  async sendWhatsApp(phoneNumber: string, template: string, params: Record<string, string>): Promise<boolean> {
    if (!this.whatsappToken || !this.whatsappPhoneId || this.whatsappToken.includes('placeholder')) {
      console.log(`[Notification - WhatsApp Mock] To: ${phoneNumber} | Template: ${template} | Params:`, params);
      return true;
    }

    try {
      const url = `https://graph.facebook.com/v18.0/${this.whatsappPhoneId}/messages`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.whatsappToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'template',
          template: {
            name: template,
            language: { code: 'en' },
            components: [
              {
                type: 'body',
                parameters: Object.entries(params).map(([_, val]) => ({
                  type: 'text',
                  text: val,
                })),
              },
            ],
          },
        }),
      });

      return res.ok;
    } catch (err: any) {
      console.error('[Notification - WhatsApp Error]:', err.message);
      return false;
    }
  }

  async sendWebPush(subscription: any, payload: PushPayload): Promise<boolean> {
    if (!subscription || !subscription.endpoint) {
      console.log('[Notification - Web Push Mock]:', payload);
      return true;
    }

    try {
      await webpush.sendNotification(subscription, JSON.stringify(payload));
      return true;
    } catch (err: any) {
      console.error('[Notification - Web Push Error]:', err.message);
      return false;
    }
  }
}

export const notificationService = new NotificationService();
