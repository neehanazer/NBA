'use client';

import React from 'react';
import { Typography, Breadcrumb } from 'antd';
import { CloudUploadOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import UploadWizard from '@/components/upload/UploadWizard';

const { Title, Text } = Typography;

export default function UploadPage() {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link href="/"><HomeOutlined /> Home</Link> },
          { title: 'Upload & Print' },
        ]}
      />

      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <Title level={2} style={{ color: '#1B3A5C', margin: 0 }}>
          Upload Document &amp; Join Print Queue
        </Title>
        <Text type="secondary">
          Automated analysis will extract page count, color elements, and compute instant pricing.
        </Text>
      </div>

      <UploadWizard />
    </div>
  );
}
