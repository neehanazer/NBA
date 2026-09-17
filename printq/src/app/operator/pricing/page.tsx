'use client';

import React from 'react';
import { Typography, Breadcrumb } from 'antd';
import { SettingOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import PricingEditor from '@/components/operator/PricingEditor';

const { Title, Text } = Typography;

export default function PricingPage() {
  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link href="/"><HomeOutlined /> Home</Link> },
          { title: <Link href="/operator">Operator Dashboard</Link> },
          { title: 'Pricing Configuration' },
        ]}
      />

      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ color: '#1B3A5C', margin: 0 }}>
          Print Shop Tariff Settings
        </Title>
        <Text type="secondary">
          Configure per-page base rates for black &amp; white, full color, and double-sided discounts.
        </Text>
      </div>

      <PricingEditor />
    </div>
  );
}
