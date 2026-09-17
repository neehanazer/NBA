'use client';

import React from 'react';
import { Card, Descriptions, Typography, Tag, Statistic, Divider, Space } from 'antd';
import { DollarCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useUploadStore } from '@/stores/uploadStore';
import { usePricing } from '@/hooks/usePricing';

const { Text, Title } = Typography;

export default function CostBreakdown() {
  const { costBreakdown, copies, duplex } = useUploadStore();
  const { pricing } = usePricing();

  if (!costBreakdown) return null;

  const currencySymbol = pricing?.currencySymbol || '₹';
  const rateBW = pricing?.ratePerPageBW ?? 2.0;
  const rateColor = pricing?.ratePerPageColor ?? 5.0;

  return (
    <Card style={{ borderRadius: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          Itemized Cost Breakdown
        </Title>
        <Tag color="blue" icon={<InfoCircleOutlined />}>
          Verified Per-Page Rates
        </Tag>
      </div>

      <Descriptions bordered column={1} size="middle" style={{ background: '#fafafa' }}>
        <Descriptions.Item label={`Black & White Pages (${costBreakdown.bwPages} pages @ ${currencySymbol}${rateBW.toFixed(2)})`}>
          <Text strong>{currencySymbol}{costBreakdown.bwCost.toFixed(2)}</Text>
        </Descriptions.Item>

        <Descriptions.Item label={`Color Pages (${costBreakdown.colorPages} pages @ ${currencySymbol}${rateColor.toFixed(2)})`}>
          <Text strong style={{ color: costBreakdown.colorPages > 0 ? '#d4380d' : undefined }}>
            {currencySymbol}{costBreakdown.colorCost.toFixed(2)}
          </Text>
        </Descriptions.Item>

        <Descriptions.Item label="Subtotal (Per Copy)">
          <Text>{currencySymbol}{costBreakdown.subtotal.toFixed(2)}</Text>
        </Descriptions.Item>

        {duplex && costBreakdown.duplexDiscount > 0 && (
          <Descriptions.Item label="Duplex Savings (10% Eco Discount)">
            <Text type="success" strong>
              - {currencySymbol}{costBreakdown.duplexDiscount.toFixed(2)}
            </Text>
          </Descriptions.Item>
        )}

        {copies > 1 && (
          <Descriptions.Item label="Number of Copies">
            <Text strong>× {copies} sets</Text>
          </Descriptions.Item>
        )}
      </Descriptions>

      <Divider style={{ margin: '16px 0' }} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          background: '#f6ffed',
          borderRadius: 8,
          border: '1px solid #b7eb8f',
        }}
      >
        <Space direction="vertical" size={0}>
          <Text strong style={{ fontSize: 16, color: '#135200' }}>
            Total Printing Amount
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Includes all pages, copies, and applicable discounts
          </Text>
        </Space>

        <Statistic
          value={costBreakdown.total}
          prefix={currencySymbol}
          precision={2}
          valueStyle={{ color: '#389e0d', fontWeight: 700, fontSize: 26 }}
        />
      </div>
    </Card>
  );
}
