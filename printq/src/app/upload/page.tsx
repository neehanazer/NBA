'use client';

import React from 'react';
import { Typography, Breadcrumb, Tag, Space } from 'antd';
import { CloudUploadOutlined, HomeOutlined, BankOutlined, EnvironmentOutlined } from '@ant-design/icons';
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
          { title: 'Upload &amp; Print Document' },
        ]}
      />

      <div style={{ marginBottom: 28, textAlign: 'center' }}>
        <img
          src="/fisat-official-logo.png"
          alt="FISAT Official Logo"
          style={{
            width: 58,
            height: 58,
            objectFit: 'contain',
            borderRadius: 12,
            background: '#FFFFFF',
            padding: 3,
            border: '1px solid #CBD5E1',
            boxShadow: '0 4px 12px rgba(11, 37, 69, 0.08)',
            marginBottom: 10,
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span className="fisat-gold-pill">
            <BankOutlined /> FISAT Central Reprographics
          </span>
          <Tag color="#0B2545" icon={<EnvironmentOutlined />} style={{ borderRadius: 6, margin: 0 }}>
            Counter 1 Spooler
          </Tag>
        </div>
        <Title level={2} style={{ color: '#0B2545', margin: '0 0 4px', fontWeight: 900 }}>
          Submit Academic Document for Printing
        </Title>
        <Text type="secondary" style={{ fontSize: 14 }}>
          Automated analysis extracts page count, scans color elements, and computes instant subsidized pricing.
        </Text>
      </div>

      <UploadWizard />
    </div>
  );
}
