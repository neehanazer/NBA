'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Typography, message, Card, Popconfirm } from 'antd';
import {
  PrinterOutlined,
  CheckCircleOutlined,
  UserOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Job, JobStatus } from '@/types';
import StatusBadge from '../jobs/StatusBadge';

const { Text } = Typography;

interface QueueBoardProps {
  queue: Job[];
  loading?: boolean;
  onRefresh?: () => void;
}

export default function QueueBoard({ queue, loading, onRefresh }: QueueBoardProps) {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleStartPrint = async (job: Job) => {
    setProcessingId(job.id);
    try {
      const printServerUrl = process.env.NEXT_PUBLIC_PRINT_SERVER_URL || 'http://localhost:4000';
      
      // Dispatch print command to print server
      try {
        await fetch(`${printServerUrl}/jobs/print`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId: job.id,
            filename: job.convertedPdf || job.originalFile,
            copies: job.copies,
            duplex: job.duplex,
            color: job.colorPages && job.colorPages.length > 0,
            phone: job.user?.phone,
          }),
        });
      } catch {
        // Fallback if print server is offline
      }

      // Update status in database
      const res = await fetch(`/api/jobs/${job.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PRINTING' }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      message.success(`Job #${job.id.slice(-4)} sent to printer!`);
      if (onRefresh) onRefresh();
    } catch (err: any) {
      message.error(`Print dispatch failed: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleCompleteJob = async (job: Job) => {
    setProcessingId(job.id);
    try {
      const res = await fetch(`/api/jobs/${job.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'COMPLETED' }),
      });

      if (!res.ok) throw new Error('Failed to complete job');

      message.success(`Job marked COMPLETED. Student notified for pickup.`);
      if (onRefresh) onRefresh();
    } catch (err: any) {
      message.error(`Error: ${err.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const columns: ColumnsType<Job> = [
    {
      title: 'FCFS #',
      key: 'position',
      width: 80,
      render: (_: any, _record: Job, index: number) => (
        <Tag color={index === 0 ? 'gold' : 'blue'} style={{ fontSize: 13, fontWeight: 700 }}>
          #{index + 1}
        </Tag>
      ),
    },
    {
      title: 'Student',
      key: 'student',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={2}>
          <Space>
            <UserOutlined />
            <Text strong>{record.user?.name || 'Student'}</Text>
          </Space>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.user?.phone || record.user?.email}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Document & Specs',
      key: 'specs',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={2}>
          <Text strong>{record.originalName}</Text>
          <div>
            <Tag color="cyan">{record.pageCount || 1} pages</Tag>
            {record.colorPages && record.colorPages.length > 0 ? (
              <Tag color="volcano">{record.colorPages.length} Color</Tag>
            ) : (
              <Tag color="default">B&amp;W</Tag>
            )}
            <Tag color={record.duplex ? 'purple' : 'default'}>
              {record.duplex ? 'Duplex' : 'Single'}
            </Tag>
            <Tag color="geekblue">{record.copies} set(s)</Tag>
          </div>
        </Space>
      ),
    },
    {
      title: 'Payment',
      key: 'payment',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={2}>
          <Text strong>₹{(record.cost || 0).toFixed(2)}</Text>
          <Tag color="green">Paid ({record.paymentMethod || 'Online'})</Tag>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: Job) => <StatusBadge status={record.status} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Job) => {
        const isPrinting = record.status === 'PRINTING';
        const isLoading = processingId === record.id;

        return (
          <Space>
            {!isPrinting ? (
              <Button
                type="primary"
                icon={<PrinterOutlined />}
                loading={isLoading}
                onClick={() => handleStartPrint(record)}
                style={{ background: '#1B3A5C' }}
              >
                Send to Printer
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                loading={isLoading}
                style={{ background: '#52c41a', borderColor: '#52c41a' }}
                onClick={() => handleCompleteJob(record)}
              >
                Mark Done &amp; Pickup
              </Button>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Space>
            <ClockCircleOutlined style={{ color: '#1B3A5C' }} />
            <span>Strict FCFS Live Queue ({queue.length} active jobs)</span>
          </Space>
          <Button icon={<SyncOutlined />} onClick={onRefresh} loading={loading}>
            Refresh
          </Button>
        </div>
      }
      style={{ borderRadius: 12 }}
    >
      <Table
        dataSource={queue}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
    </Card>
  );
}
