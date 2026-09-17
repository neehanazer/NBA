'use client';

import React from 'react';
import { Typography, Breadcrumb, Card, Row, Col, Progress, Table, Tag } from 'antd';
import { LineChartOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import DailySummary from '@/components/operator/DailySummary';

const { Title, Text } = Typography;

export default function StatsPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.getDashboardStats(),
  });

  const completionRate =
    stats && stats.totalJobsToday > 0
      ? Math.round((stats.completedJobsToday / stats.totalJobsToday) * 100)
      : 100;

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link href="/"><HomeOutlined /> Home</Link> },
          { title: <Link href="/operator">Operator Dashboard</Link> },
          { title: 'Analytics & Reports' },
        ]}
      />

      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ color: '#1B3A5C', margin: 0 }}>
          Daily Shop Performance Analytics
        </Title>
        <Text type="secondary">
          Monitor printer throughput, job completion rates, and daily revenue generation.
        </Text>
      </div>

      <DailySummary stats={stats} loading={isLoading} />

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Today's Job Completion Efficiency" style={{ borderRadius: 12 }}>
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <Progress
                type="circle"
                percent={completionRate}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                size={160}
              />
              <div style={{ marginTop: 16 }}>
                <Text strong style={{ fontSize: 16 }}>
                  {stats?.completedJobsToday || 0} of {stats?.totalJobsToday || 0} jobs completed
                </Text>
                <div style={{ color: '#8c8c8c', fontSize: 13, marginTop: 4 }}>
                  {stats?.pendingJobsToday || 0} jobs remaining in queue
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Operational Service Levels" style={{ borderRadius: 12 }}>
            <div style={{ padding: '8px 0' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text strong>Average Turnaround Target (&lt; 15 mins)</Text>
                  <Tag color="green">Healthy (8 min avg)</Tag>
                </div>
                <Progress percent={85} strokeColor="#52c41a" />
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text strong>Printer Hardware Uptime</Text>
                  <Tag color="blue">100% Online</Tag>
                </div>
                <Progress percent={100} strokeColor="#1890ff" />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text strong>Paper Saving Duplex Adoption</Text>
                  <Tag color="purple">62% of jobs</Tag>
                </div>
                <Progress percent={62} strokeColor="#722ed1" />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
