'use client';

import React, { useState } from 'react';
import { Steps, Button, Result, Space, Card, Progress, Typography, Tag } from 'antd';
import {
  UploadOutlined,
  SyncOutlined,
  ControlOutlined,
  RocketOutlined,
  FileDoneOutlined,
  EnvironmentOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import Link from 'next/link';
import { useUploadStore } from '@/stores/uploadStore';
import FileDropzone from './FileDropzone';
import PrintOptions from './PrintOptions';
import CostBreakdown from './CostBreakdown';
import PaymentModal from '../payment/PaymentModal';
import QueuePosition from '../jobs/QueuePosition';

const { Text } = Typography;

export default function UploadWizard() {
  const {
    currentStep,
    nextStep,
    prevStep,
    isProcessing,
    processingStep,
    processingProgress,
    jobId,
    costBreakdown,
    queuePosition,
    estimatedMinutes,
    setQueueResult,
    reset,
  } = useUploadStore();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  const steps = [
    { title: 'Upload', icon: <UploadOutlined /> },
    { title: 'Analyze', icon: <SyncOutlined spin={isProcessing} /> },
    { title: 'Options', icon: <ControlOutlined /> },
    { title: 'Tariff', icon: <FileDoneOutlined /> },
    { title: 'Token & Queue', icon: <RocketOutlined /> },
  ];

  const handlePaymentSuccess = (res: { queuePosition: number; estimatedMinutes: number }) => {
    setQueueResult(res.queuePosition, res.estimatedMinutes);
    nextStep();
  };

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <Card
        style={{
          borderRadius: 16,
          marginBottom: 24,
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(11, 37, 69, 0.04)',
        }}
      >
        <Steps current={currentStep} items={steps} />
      </Card>

      {/* Step 0: Upload Document */}
      {currentStep === 0 && <FileDropzone />}

      {/* Step 1: Processing Animation */}
      {currentStep === 1 && (
        <Card style={{ borderRadius: 16, textAlign: 'center', padding: '56px 24px', border: '1px solid #E2E8F0' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: '#EEF2F6',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0B2545',
              fontSize: 32,
              marginBottom: 20,
            }}
          >
            <SyncOutlined spin />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#0B2545', marginBottom: 8 }}>
            {processingStep || 'Processing Document on FISAT Print Spooler...'}
          </div>
          <Text type="secondary" style={{ maxWidth: 440, margin: '0 auto', display: 'block', fontSize: 13 }}>
            Converting file format with LibreOffice headless and executing Ghostscript per-page color ink analysis.
          </Text>
          <div style={{ maxWidth: 420, margin: '28px auto 0' }}>
            <Progress percent={processingProgress} status="active" strokeColor="#0B2545" />
          </div>
        </Card>
      )}

      {/* Step 2: Print Options */}
      {currentStep === 2 && (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <PrintOptions />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={prevStep} size="large" style={{ borderRadius: 8 }}>
              Back to Upload
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={nextStep}
              style={{ background: '#0B2545', borderColor: '#0B2545', borderRadius: 8, fontWeight: 700 }}
            >
              Review Tariff &amp; Breakdown
            </Button>
          </div>
        </Space>
      )}

      {/* Step 3: Cost Confirmation */}
      {currentStep === 3 && (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <CostBreakdown />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={prevStep} size="large" style={{ borderRadius: 8 }}>
              Back to Options
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => setPaymentModalOpen(true)}
              style={{
                background: '#0B2545',
                borderColor: '#0B2545',
                borderRadius: 8,
                fontWeight: 800,
                boxShadow: '0 4px 14px rgba(11, 37, 69, 0.25)',
              }}
            >
              Confirm &amp; Proceed to Payment (₹{costBreakdown?.total.toFixed(2)})
            </Button>
          </div>
        </Space>
      )}

      {/* Step 4: Queued Result */}
      {currentStep >= 4 && (
        <Card style={{ borderRadius: 16, border: '1px solid #E2E8F0' }}>
          {jobId && <QueuePosition jobId={jobId} />}

          <Result
            icon={<CheckCircleFilled style={{ color: '#10B981', fontSize: 64 }} />}
            title={
              <span style={{ color: '#0B2545', fontWeight: 900, fontSize: 24 }}>
                FISAT Print Token Issued &amp; Queued!
              </span>
            }
            subTitle={
              <div style={{ marginTop: 8, color: '#475569', fontSize: 14 }}>
                {queuePosition ? (
                  <>
                    Your document is in the printer spool at <strong>FCFS Position #{queuePosition}</strong>.
                    <br />
                    Estimated printing completion in ~<strong>{estimatedMinutes || 2} minutes</strong>.
                  </>
                ) : (
                  'Your document has been registered in the print queue.'
                )}
                <div style={{ marginTop: 12 }}>
                  <Tag color="blue" icon={<EnvironmentOutlined />} style={{ padding: '4px 12px', fontSize: 13 }}>
                    Pickup: Counter 1 — Main Block Central Reprographics
                  </Tag>
                </div>
              </div>
            }
            extra={[
              <Link href="/dashboard" key="jobs">
                <Button
                  type="primary"
                  size="large"
                  style={{ background: '#0B2545', borderColor: '#0B2545', borderRadius: 8, fontWeight: 700 }}
                >
                  Track in My Print Jobs
                </Button>
              </Link>,
              <Button key="another" size="large" onClick={reset} style={{ borderRadius: 8 }}>
                Print Another File
              </Button>,
            ]}
          />
        </Card>
      )}

      {/* Payment Selection Modal */}
      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
