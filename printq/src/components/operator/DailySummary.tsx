'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Typography } from 'antd';
import {
  DollarOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { DashboardStats } from '@/types';

const { Title } = Typography;

interface DailySummaryProps {
  stats?: DashboardStats;
  loading?: boolean;
}

export default function DailySummary({ stats, loading }: DailySummaryProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        Daily Shop Summary
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 12 }}>
            <Statistic
              title="Revenue Today"
              value={stats?.revenueToday || 0}
              prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
              suffix="₹"
              valueStyle={{ color: '#389e0d', fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 12 }}>
            <Statistic
              title="Jobs Today"
              value={stats?.totalJobsToday || 0}
              prefix={<FileDoneOutlined style={{ color: '#1B3A5C' }} />}
              valueStyle={{ color: '#1B3A5C', fontWeight: 700 }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 12 }}>
            <Statistic
              title="Completed"
              value={stats?.completedJobsToday || 0}
              prefix={<CheckCircleOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#096dd9' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 12 }}>
            <Statistic
              title="Active in Queue"
              value={stats?.pendingJobsToday || 0}
              prefix={<ClockCircleOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: '#d46b08' }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8} lg={4.8} style={{ flex: 1 }}>
          <Card loading={loading} style={{ borderRadius: 12 }}>
            <Statistic
              title="Avg Turnaround"
              value={stats?.avgTurnaroundMinutes || 8}
              prefix={<ThunderboltOutlined style={{ color: '#722ed1' }} />}
              suffix="min"
              valueStyle={{ color: '#531dab' }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
