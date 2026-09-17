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
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img
            src="/fisat-official-logo.png"
            alt="FISAT Official Logo"
            style={{
              width: 48,
              height: 48,
              objectFit: 'contain',
              borderRadius: 10,
              background: '#FFFFFF',
              padding: 2,
              border: '1px solid #CBD5E1',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              flexShrink: 0,
            }}
          />
          <div>
            <Title level={2} style={{ color: '#0B2545', margin: 0, fontWeight: 900 }}>
              Operator Print Queue Control
            </Title>
            <Text type="secondary">
              Central Spooler Counter 1 • Manage strict First-Come, First-Served jobs and dispatch them to the physical printer.
            </Text>
          </div>
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
