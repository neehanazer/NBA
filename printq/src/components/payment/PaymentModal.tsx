'use client';

import React, { useState } from 'react';
import { Modal, Radio, Space, Typography, Button, message, Alert, Divider } from 'antd';
import {
  CreditCardOutlined,
  ShopOutlined,
  CheckCircleFilled,
  SafetyCertificateOutlined,
  BankOutlined,
  QrcodeOutlined,
} from '@ant-design/icons';
import { useUploadStore } from '@/stores/uploadStore';
import { api } from '@/lib/api';

const { Text, Title } = Typography;

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (result: { queuePosition: number; estimatedMinutes: number }) => void;
}

export default function PaymentModal({ open, onClose, onSuccess }: PaymentModalProps) {
  const { jobId, costBreakdown, paymentMethod, setPaymentMethod } = useUploadStore();
  const [loading, setLoading] = useState(false);

  const amount = costBreakdown?.total || 0;

  const handleProcessPayment = async () => {
    if (!jobId) {
      message.error('No active job found to pay for.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.payForJob(jobId, paymentMethod);
      message.success('Payment confirmed! Your document has entered the FISAT print queue.');
      onSuccess({
        queuePosition: (res as any).queuePosition || 1,
        estimatedMinutes: (res as any).estimatedMinutes || 2,
      });
      onClose();
    } catch (err: any) {
      message.error(`Payment failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#0B2545',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D4AF37',
            }}
          >
            <BankOutlined />
          </div>
          <div>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#0B2545' }}>
              Confirm Payment &amp; Obtain Queue Token
            </span>
          </div>
        </div>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading} style={{ borderRadius: 8 }}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleProcessPayment}
          style={{
            background: '#0B2545',
            borderColor: '#0B2545',
            borderRadius: 8,
            fontWeight: 700,
            padding: '0 24px',
          }}
        >
          {paymentMethod === 'online' ? `Pay ₹${amount.toFixed(2)} Online` : 'Confirm & Pay at Counter'}
        </Button>,
      ]}
      width={520}
    >
      <div style={{ padding: '8px 0' }}>
        <Alert
          message="Strict Campus FCFS Order"
          description="Your position in the FISAT printer spool is assigned upon confirmation. Please ensure your submission is final."
          type="info"
          showIcon
          style={{ marginBottom: 16, borderRadius: 8 }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 18px',
            background: '#F8FAFC',
            borderRadius: 10,
            border: '1px solid #E2E8F0',
            marginBottom: 20,
          }}
        >
          <div>
            <Text type="secondary" style={{ fontSize: 13 }}>Total Payable Amount:</Text>
            <div style={{ fontSize: 11, color: '#64748B' }}>FISAT Student Subsidized Tariff</div>
          </div>
          <Title level={3} style={{ margin: 0, color: '#0B2545', fontWeight: 800 }}>
            ₹{amount.toFixed(2)}
          </Title>
        </div>

        <Text strong style={{ display: 'block', marginBottom: 10, color: '#0B2545' }}>
          Select Payment Method:
        </Text>

        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size={12}>
            <Radio
              value="online"
              style={{
                width: '100%',
                border: paymentMethod === 'online' ? '2px solid #0B2545' : '1px solid #E2E8F0',
                padding: '14px',
                borderRadius: 10,
                background: paymentMethod === 'online' ? '#F0F7FF' : '#FFFFFF',
              }}
            >
              <Space direction="vertical" size={2}>
                <Space>
                  <QrcodeOutlined style={{ color: '#0B2545', fontSize: 16 }} />
                  <Text strong style={{ color: '#0B2545' }}>
                    Instant UPI / QR / Net Banking
                  </Text>
                </Space>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Instant verification. Immediate highest-priority entry into the print queue.
                </Text>
              </Space>
            </Radio>

            <Radio
              value="counter"
              style={{
                width: '100%',
                border: paymentMethod === 'counter' ? '2px solid #0B2545' : '1px solid #E2E8F0',
                padding: '14px',
                borderRadius: 10,
                background: paymentMethod === 'counter' ? '#F0F7FF' : '#FFFFFF',
              }}
            >
              <Space direction="vertical" size={2}>
                <Space>
                  <ShopOutlined style={{ color: '#D97706', fontSize: 16 }} />
                  <Text strong style={{ color: '#0B2545' }}>
                    Pay at Main Block Counter (Cash / UPI)
                  </Text>
                </Space>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Pay in-person at Counter 1 when collecting your printed sheets.
                </Text>
              </Space>
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  );
}
