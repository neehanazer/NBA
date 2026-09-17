'use client';

import React from 'react';
import { Typography, Button, Space, Row, Col, Card, Statistic, Breadcrumb, Tag, Alert } from 'antd';
import {
  CloudUploadOutlined,
  HomeOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  BankOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useJobs } from '@/hooks/useJobs';
import JobsTable from '@/components/jobs/JobsTable';
import QueuePosition from '@/components/jobs/QueuePosition';

const { Title, Text } = Typography;

export default function DashboardPage() {
  const { jobs, isLoading, refetch } = useJobs();

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
          { title: 'My Campus Print Jobs' },
        ]}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img
            src="/fisat-official-logo.png"
            alt="FISAT Official Logo"
            style={{
              width: 52,
              height: 52,
              objectFit: 'contain',
              borderRadius: 10,
              background: '#FFFFFF',
              padding: 3,
              border: '1px solid #CBD5E1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="fisat-gold-pill">
                <BankOutlined /> FISAT Reprographics
              </span>
              <Tag color="#0B2545" style={{ borderRadius: 6 }}>Counter 1 Spooler</Tag>
            </div>
            <Title level={2} style={{ color: '#0B2545', margin: 0, fontWeight: 900 }}>
              My Print Submissions &amp; Queue
            </Title>
            <Text type="secondary">Track live queue position, collection tokens, and print history.</Text>
          </div>
        </div>

        <Space>
          <Button icon={<SyncOutlined />} onClick={() => refetch()} loading={isLoading} size="large" style={{ borderRadius: 8 }}>
            Refresh Status
          </Button>
          <Link href="/upload">
            <Button
              type="primary"
              icon={<CloudUploadOutlined />}
              size="large"
              style={{
                background: '#0B2545',
                borderColor: '#0B2545',
                borderRadius: 8,
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(11, 37, 69, 0.25)',
              }}
            >
              Submit New Print Job
            </Button>
          </Link>
        </Space>
      </div>

      {/* Active Live Queue Card */}
      {activeJob && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span className="fisat-pulse-dot" />
            <Text strong style={{ color: '#0B2545', fontSize: 15 }}>
              Active Document in FISAT Spooler: <span style={{ color: '#134074' }}>{activeJob.originalName}</span>
            </Text>
          </div>
          <QueuePosition jobId={activeJob.id} />
        </div>
      )}

      {/* Summary Metrics Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card style={{ borderRadius: 14, border: '1px solid #E2E8F0' }}>
            <Statistic
              title={<span style={{ fontWeight: 600, color: '#64748B' }}>In Active Spool</span>}
              value={activeJob ? 1 : 0}
              prefix={<ClockCircleOutlined style={{ color: '#D97706' }} />}
              valueStyle={{ color: activeJob ? '#D97706' : '#94A3B8', fontWeight: 800 }}
              suffix={activeJob ? <Tag color="gold" style={{ marginLeft: 8 }}>In Queue</Tag> : null}
            />
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card style={{ borderRadius: 14, border: '1px solid #E2E8F0' }}>
            <Statistic
              title={<span style={{ fontWeight: 600, color: '#64748B' }}>Collected Prints</span>}
              value={completedCount}
              prefix={<CheckCircleOutlined style={{ color: '#10B981' }} />}
              valueStyle={{ color: '#10B981', fontWeight: 800 }}
            />
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card style={{ borderRadius: 14, border: '1px solid #E2E8F0' }}>
            <Statistic
              title={<span style={{ fontWeight: 600, color: '#64748B' }}>Total Subsidized Spend</span>}
              value={totalSpent}
              prefix="₹"
              precision={2}
              valueStyle={{ color: '#0B2545', fontWeight: 800 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Jobs History Table */}
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <FileDoneOutlined style={{ color: '#0B2545' }} />
            <span style={{ fontWeight: 800, color: '#0B2545' }}>Print Job History &amp; Collection Tokens</span>
          </div>
        }
        style={{ borderRadius: 16, border: '1px solid #E2E8F0' }}
      >
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
