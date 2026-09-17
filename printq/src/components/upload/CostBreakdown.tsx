'use client';

import React from 'react';
import { Card, Descriptions, Typography, Tag, Statistic, Divider, Space } from 'antd';
import { DollarCircleOutlined, InfoCircleOutlined, CheckCircleFilled, BankOutlined } from '@ant-design/icons';
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
    <Card style={{ borderRadius: 16, border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src="/fisat-official-logo.png"
            alt="FISAT Official Logo"
            style={{
              width: 42,
              height: 42,
              objectFit: 'contain',
              borderRadius: 8,
              background: '#FFFFFF',
              padding: 2,
              border: '1px solid #CBD5E1',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              flexShrink: 0,
            }}
          />
          <div>
            <Title level={4} style={{ color: '#0B2545', margin: 0 }}>
              Itemized Campus Print Tariff
            </Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Official student subsidized rates approved by FISAT Reprographics.
            </Text>
          </div>
        </div>
        <span className="fisat-gold-pill">
          <BankOutlined /> Subsidized
        </span>
      </div>

      <Descriptions
        bordered
        column={1}
        size="middle"
        style={{ background: '#FFFFFF', borderRadius: 10, overflow: 'hidden' }}
      >
        <Descriptions.Item
          label={
            <span>
              <Text strong>Black &amp; White Pages</Text>
              <div style={{ fontSize: 11, color: '#64748B' }}>
                {costBreakdown.bwPages} pages @ {currencySymbol}{rateBW.toFixed(2)} per page
              </div>
            </span>
          }
        >
          <Text strong style={{ fontSize: 15, color: '#0B2545' }}>
            {currencySymbol}{costBreakdown.bwCost.toFixed(2)}
          </Text>
        </Descriptions.Item>

        <Descriptions.Item
          label={
            <span>
              <Text strong>Color Diagram &amp; Image Pages</Text>
              <div style={{ fontSize: 11, color: '#64748B' }}>
                {costBreakdown.colorPages} pages @ {currencySymbol}{rateColor.toFixed(2)} per page
              </div>
            </span>
          }
        >
          <Text strong style={{ fontSize: 15, color: costBreakdown.colorPages > 0 ? '#EA580C' : '#0B2545' }}>
            {currencySymbol}{costBreakdown.colorCost.toFixed(2)}
          </Text>
        </Descriptions.Item>

        <Descriptions.Item label={<Text strong>Subtotal (Per Copy)</Text>}>
          <Text style={{ fontSize: 14 }}>{currencySymbol}{costBreakdown.subtotal.toFixed(2)}</Text>
        </Descriptions.Item>

        {duplex && costBreakdown.duplexDiscount > 0 && (
          <Descriptions.Item
            label={
              <Space>
                <CheckCircleFilled style={{ color: '#10B981' }} />
                <Text strong style={{ color: '#065F46' }}>Duplex Discount (10% Eco Savings)</Text>
              </Space>
            }
          >
            <Text type="success" strong style={{ fontSize: 15 }}>
              - {currencySymbol}{costBreakdown.duplexDiscount.toFixed(2)}
            </Text>
          </Descriptions.Item>
        )}

        {copies > 1 && (
          <Descriptions.Item label={<Text strong>Sets / Copies Multiplier</Text>}>
            <Tag color="purple" style={{ fontSize: 13, fontWeight: 700, padding: '2px 10px' }}>
              × {copies} sets
            </Tag>
          </Descriptions.Item>
        )}
      </Descriptions>

      <Divider style={{ margin: '20px 0 16px' }} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
          borderRadius: 12,
          border: '1px solid #86EFAC',
        }}
      >
        <Space direction="vertical" size={2}>
          <Text strong style={{ fontSize: 16, color: '#14532D' }}>
            Final Payable Amount
          </Text>
          <Text type="secondary" style={{ fontSize: 12, color: '#166534' }}>
            Net total with paper costs, color printing &amp; student discounts included
          </Text>
        </Space>

        <Statistic
          value={costBreakdown.total}
          prefix={currencySymbol}
          precision={2}
          valueStyle={{ color: '#15803D', fontWeight: 800, fontSize: 30 }}
        />
      </div>
    </Card>
  );
}
