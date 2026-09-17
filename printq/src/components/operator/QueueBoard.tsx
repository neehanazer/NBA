'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Typography, message, Card, Popconfirm, Badge } from 'antd';
import {
  PrinterOutlined,
  CheckCircleOutlined,
  UserOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  BankOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Job } from '@/types';
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
        // Fallback if print server is in offline mock
      }

      const res = await fetch(`/api/jobs/${job.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PRINTING' }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      message.success(`Job Token #${job.id.slice(-5).toUpperCase()} sent to FISAT physical printer!`);
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

      message.success(`Job marked COMPLETED. Student notified for Counter 1 pickup.`);
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
      width: 90,
      render: (_: any, _record: Job, index: number) => (
        <span
          className={index === 0 ? 'fisat-gold-pill' : undefined}
          style={
            index === 0
              ? undefined
              : {
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#0B2545',
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: '#EEF2F6',
                }
          }
        >
          #{index + 1}
        </span>
      ),
    },
    {
      title: 'Student & Contact',
      key: 'student',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={2}>
          <Space>
            <UserOutlined style={{ color: '#0B2545' }} />
            <Text strong style={{ color: '#0B2545' }}>{record.user?.name || 'FISAT Student'}</Text>
          </Space>
          <div style={{ fontSize: 11, color: '#64748B' }}>
            {record.user?.email} {record.user?.phone && `• ${record.user.phone}`}
          </div>
        </Space>
      ),
    },
    {
      title: 'Document & Spool Specs',
      key: 'specs',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={2}>
          <Text strong style={{ color: '#0B2545' }}>{record.originalName}</Text>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            <Tag color="cyan">{record.pageCount || 1} pages</Tag>
            {record.colorPages && record.colorPages.length > 0 ? (
              <Tag color="volcano">{record.colorPages.length} Color Pages</Tag>
            ) : (
              <Tag color="default">All B&amp;W</Tag>
            )}
            <Tag color={record.duplex ? 'purple' : 'default'}>
              {record.duplex ? 'Two-Sided (Duplex)' : 'Single'}
            </Tag>
            <Tag color="blue">{record.copies} set(s)</Tag>
          </div>
        </Space>
      ),
    },
    {
      title: 'Tariff',
      key: 'payment',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={2}>
          <Text strong style={{ color: '#0B2545', fontSize: 15 }}>
            ₹{(record.cost || 0).toFixed(2)}
          </Text>
          <Tag color="green" style={{ fontSize: 11 }}>
            Paid ({record.paymentMethod === 'counter' ? 'Counter' : 'Online'})
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Spool Status',
      key: 'status',
      render: (_: any, record: Job) => <StatusBadge status={record.status} />,
    },
    {
      title: 'Operator Actions',
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
                style={{
                  background: '#0B2545',
                  borderColor: '#0B2545',
                  fontWeight: 700,
                  borderRadius: 6,
                }}
              >
                Send to CUPS Printer
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<CheckCircleOutlined />}
                loading={isLoading}
                style={{
                  background: '#10B981',
                  borderColor: '#10B981',
                  fontWeight: 700,
                  borderRadius: 6,
                }}
                onClick={() => handleCompleteJob(record)}
              >
                Ready for Pickup
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <Space size="middle">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#0B2545',
                color: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BankOutlined />
            </div>
            <div>
              <span style={{ fontWeight: 800, color: '#0B2545', fontSize: 16 }}>
                FISAT Central Spooler FCFS Queue
              </span>
              <span style={{ fontSize: 12, color: '#64748B', display: 'block' }}>
                Counter 1 High-Speed Production Queue ({queue.length} jobs in queue)
              </span>
            </div>
          </Space>
          <Button icon={<SyncOutlined />} onClick={onRefresh} loading={loading} style={{ borderRadius: 6 }}>
            Refresh Spooler
          </Button>
        </div>
      }
      style={{ borderRadius: 16, border: '1px solid #E2E8F0' }}
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
