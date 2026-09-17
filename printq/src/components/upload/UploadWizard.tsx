'use client';

import React, { useState } from 'react';
import { Steps, Button, Result, Space, Card, Progress, Typography } from 'antd';
import {
  UploadOutlined,
  SyncOutlined,
  ControlOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  FileDoneOutlined,
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
    { title: 'Pricing', icon: <FileDoneOutlined /> },
    { title: 'Queued', icon: <RocketOutlined /> },
  ];

  const handlePaymentSuccess = (res: { queuePosition: number; estimatedMinutes: number }) => {
    setQueueResult(res.queuePosition, res.estimatedMinutes);
    nextStep(); // Advance to Queued step
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      <Card style={{ borderRadius: 12, marginBottom: 24 }}>
        <Steps current={currentStep} items={steps} />
      </Card>

      {/* Step 0: Upload Document */}
      {currentStep === 0 && <FileDropzone />}

      {/* Step 1: Processing Animation */}
      {currentStep === 1 && (
        <Card style={{ borderRadius: 12, textAlign: 'center', padding: '48px 24px' }}>
          <SyncOutlined spin style={{ fontSize: 48, color: '#1B3A5C', marginBottom: 24 }} />
          <div style={{ fontSize: 18, fontWeight: 600, color: '#1B3A5C', marginBottom: 8 }}>
            {processingStep || 'Processing your document...'}
          </div>
          <Text type="secondary">
            Converting formats, calculating total pages, and running color ink coverage analysis.
          </Text>
          <div style={{ maxWidth: 400, margin: '24px auto 0' }}>
            <Progress percent={processingProgress} status="active" strokeColor="#1B3A5C" />
          </div>
        </Card>
      )}

      {/* Step 2: Print Options */}
      {currentStep === 2 && (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <PrintOptions />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={prevStep}>Back to Upload</Button>
            <Button type="primary" onClick={nextStep} style={{ background: '#1B3A5C' }}>
              Review Cost &amp; Breakdown
            </Button>
          </div>
        </Space>
      )}

      {/* Step 3: Cost Confirmation */}
      {currentStep === 3 && (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <CostBreakdown />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={prevStep}>Back to Options</Button>
            <Button
              type="primary"
              size="large"
              onClick={() => setPaymentModalOpen(true)}
              style={{ background: '#1B3A5C' }}
            >
              Confirm &amp; Proceed to Payment (₹{costBreakdown?.total.toFixed(2)})
            </Button>
          </div>
        </Space>
      )}

      {/* Step 4: Queued Result */}
      {currentStep >= 4 && (
        <Card style={{ borderRadius: 12 }}>
          {jobId && <QueuePosition jobId={jobId} />}

          <Result
            status="success"
            title="Your Print Job has been Placed in Queue!"
            subTitle={
              queuePosition
                ? `You are #${queuePosition} in line. Estimated pickup in ~${estimatedMinutes || 2} minutes.`
                : 'Job received and queued.'
            }
            extra={[
              <Link href="/dashboard" key="jobs">
                <Button type="primary" style={{ background: '#1B3A5C' }}>
                  Track in My Jobs
                </Button>
              </Link>,
              <Button key="another" onClick={reset}>
                Print Another Document
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
