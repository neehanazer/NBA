'use client';

import React from 'react';
import { Typography, Breadcrumb, Space, Button } from 'antd';
import { DashboardOutlined, HomeOutlined, SyncOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useQueue } from '@/hooks/useQueue';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import QueueBoard from '@/components/operator/QueueBoard';
import DailySummary from '@/components/operator/DailySummary';

const { Title, Text } = Typography;

export default function OperatorPage() {
  const { queue, isLoading: queueLoading, refetch: refetchQueue } = useQueue();

  const statsQuery = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.getDashboardStats(),
    refetchInterval: 15000,
  });

  const handleRefreshAll = () => {
    refetchQueue();
    statsQuery.refetch();
  };

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link href="/"><HomeOutlined /> Home</Link> },
          { title: 'Operator Dashboard' },
          { title: 'Live Queue' },
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
            Operator Print Queue Control
          </Title>
          <Text type="secondary">
            Manage strict First-Come, First-Served jobs and dispatch them to the physical print spooler.
          </Text>
        </div>

        <Button icon={<SyncOutlined />} onClick={handleRefreshAll} loading={queueLoading || statsQuery.isLoading}>
          Refresh Queue &amp; Stats
        </Button>
      </div>

      {/* Daily Performance Metrics */}
      <DailySummary stats={statsQuery.data} loading={statsQuery.isLoading} />

      {/* Strict FCFS Queue Board */}
      <QueueBoard queue={queue} loading={queueLoading} onRefresh={refetchQueue} />
    </div>
  );
}
