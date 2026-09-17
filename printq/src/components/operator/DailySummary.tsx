'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Typography, Tag } from 'antd';
import {
  DollarOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { DashboardStats } from '@/types';

const { Title, Text } = Typography;

interface DailySummaryProps {
  stats?: DashboardStats;
  loading?: boolean;
}

export default function DailySummary({ stats, loading }: DailySummaryProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <Title level={4} style={{ color: '#0B2545', margin: 0, fontWeight: 800 }}>
            FISAT Reprographics Production Metrics
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Counter 1 Live printer output &amp; throughput telemetry
          </Text>
        </div>
        <span className="fisat-gold-pill">
          <BankOutlined /> Live Telemetry
        </span>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 14, border: '1px solid #E2E8F0' }}>
            <Statistic
              title={<span style={{ fontWeight: 600, color: '#64748B' }}>Today's Revenue</span>}
              value={stats?.revenueToday || 0}
              prefix="₹"
              precision={2}
              valueStyle={{ color: '#10B981', fontWeight: 900 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 14, border: '1px solid #E2E8F0' }}>
            <Statistic
              title={<span style={{ fontWeight: 600, color: '#64748B' }}>Total Submissions</span>}
              value={stats?.totalJobsToday || 0}
              prefix={<FileDoneOutlined style={{ color: '#0B2545' }} />}
              valueStyle={{ color: '#0B2545', fontWeight: 900 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 14, border: '1px solid #E2E8F0' }}>
            <Statistic
              title={<span style={{ fontWeight: 600, color: '#64748B' }}>Completed &amp; Ready</span>}
              value={stats?.completedJobsToday || 0}
              prefix={<CheckCircleOutlined style={{ color: '#134074' }} />}
              valueStyle={{ color: '#134074', fontWeight: 900 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 14, border: '1px solid #E2E8F0' }}>
            <Statistic
              title={<span style={{ fontWeight: 600, color: '#64748B' }}>Active in Spool</span>}
              value={stats?.pendingJobsToday || 0}
              prefix={<ClockCircleOutlined style={{ color: '#D97706' }} />}
              valueStyle={{ color: '#D97706', fontWeight: 900 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 14, border: '1px solid #E2E8F0' }}>
            <Statistic
              title={<span style={{ fontWeight: 600, color: '#64748B' }}>Avg Turnaround</span>}
              value={stats?.avgTurnaroundMinutes || 4}
              prefix={<ThunderboltOutlined style={{ color: '#7C3AED' }} />}
              suffix="min"
              valueStyle={{ color: '#7C3AED', fontWeight: 900 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
