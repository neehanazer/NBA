'use client';

import React, { useState } from 'react';
import { Modal, Radio, Space, Typography, Button, message, Alert, Divider } from 'antd';
import {
  CreditCardOutlined,
  ShopOutlined,
  CheckCircleFilled,
  SafetyCertificateOutlined,
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
      message.success('Payment verified! Your document has entered the FCFS queue.');
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
        <Space>
          <SafetyCertificateOutlined style={{ color: '#1B3A5C' }} />
          <span>Confirm Payment &amp; Join Queue</span>
        </Space>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleProcessPayment}
          style={{ background: '#1B3A5C' }}
        >
          {paymentMethod === 'online' ? `Pay ₹${amount.toFixed(2)} Now` : 'Confirm & Pay at Counter'}
        </Button>,
      ]}
    >
      <div style={{ padding: '8px 0' }}>
        <Alert
          message="Strict FCFS Queue Policy"
          description="Your place in line is assigned immediately upon payment confirmation. First come, first served."
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#f8fafc',
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Text type="secondary">Total Amount Due:</Text>
          <Title level={3} style={{ margin: 0, color: '#1B3A5C' }}>
            ₹{amount.toFixed(2)}
          </Title>
        </div>

        <Text strong style={{ display: 'block', marginBottom: 8 }}>
          Select Payment Option:
        </Text>

        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Radio
              value="online"
              style={{
                width: '100%',
                border: '1px solid #d9d9d9',
                padding: '12px',
                borderRadius: 8,
                background: paymentMethod === 'online' ? '#f0f5ff' : '#fff',
                borderColor: paymentMethod === 'online' ? '#1B3A5C' : '#d9d9d9',
              }}
            >
              <Space direction="vertical" size={2}>
                <Space>
                  <CreditCardOutlined style={{ color: '#1B3A5C' }} />
                  <Text strong>Instant Online Pay (Simulated / UPI / Card)</Text>
                </Space>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Immediate verification &amp; priority instant placement into the print queue.
                </Text>
              </Space>
            </Radio>

            <Radio
              value="counter"
              style={{
                width: '100%',
                border: '1px solid #d9d9d9',
                padding: '12px',
                borderRadius: 8,
                background: paymentMethod === 'counter' ? '#f0f5ff' : '#fff',
                borderColor: paymentMethod === 'counter' ? '#1B3A5C' : '#d9d9d9',
              }}
            >
              <Space direction="vertical" size={2}>
                <Space>
                  <ShopOutlined style={{ color: '#fa8c16' }} />
                  <Text strong>Pay at Print Shop Counter</Text>
                </Space>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Pay cash or scanner UPI at the pickup counter when collecting your prints.
                </Text>
              </Space>
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </Modal>
  );
}
