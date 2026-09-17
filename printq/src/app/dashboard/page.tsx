'use client';

import React from 'react';
import { Typography, Button, Space, Row, Col, Card, Statistic, Breadcrumb, Empty } from 'antd';
import {
  CloudUploadOutlined,
  HomeOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useJobs } from '@/hooks/useJobs';
import JobsTable from '@/components/jobs/JobsTable';
import QueuePosition from '@/components/jobs/QueuePosition';

const { Title, Text } = Typography;

export default function DashboardPage() {
  const { jobs, isLoading, refetch } = useJobs();

  // Find most recent active job in queue
  const activeJob = jobs.find((j) => ['QUEUED', 'PRINTING'].includes(j.status));

  const totalSpent = jobs
    .filter((j) => j.paid)
    .reduce((sum, j) => sum + (j.cost || 0), 0);

  const completedCount = jobs.filter((j) => j.status === 'COMPLETED').length;

  const handleCancelJob = async (id: string) => {
    await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    refetch();
  };

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link href="/"><HomeOutlined /> Home</Link> },
          { title: 'My Print Jobs' },
        ]}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <Title level={2} style={{ color: '#1B3A5C', margin: 0 }}>
            My Print Jobs
          </Title>
          <Text type="secondary">Track queue position, download invoices, and view print history.</Text>
        </div>

        <Space>
          <Button icon={<SyncOutlined />} onClick={() => refetch()} loading={isLoading}>
            Refresh
          </Button>
          <Link href="/upload">
            <Button type="primary" icon={<CloudUploadOutlined />} style={{ background: '#1B3A5C' }}>
              New Print Job
            </Button>
          </Link>
        </Space>
      </div>

      {/* Live Queue Widget if currently in queue */}
      {activeJob && (
        <div style={{ marginBottom: 24 }}>
          <Title level={4} style={{ color: '#1B3A5C', marginBottom: 12 }}>
            Active Print Job in Queue: <span style={{ color: '#1890ff' }}>{activeJob.originalName}</span>
          </Title>
          <QueuePosition jobId={activeJob.id} />
        </div>
      )}

      {/* Metrics Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Active In Queue"
              value={activeJob ? 1 : 0}
              prefix={<ClockCircleOutlined style={{ color: '#fa8c16' }} />}
              valueStyle={{ color: activeJob ? '#fa8c16' : '#8c8c8c' }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Completed Prints"
              value={completedCount}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#389e0d' }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Total Spent"
              value={totalSpent}
              prefix="₹"
              precision={2}
              valueStyle={{ color: '#1B3A5C', fontWeight: 700 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Jobs Table */}
      <Card style={{ borderRadius: 12 }}>
        <JobsTable
          jobs={jobs}
          loading={isLoading}
          onRefresh={refetch}
          onCancelJob={handleCancelJob}
        />
      </Card>
    </div>
  );
}
