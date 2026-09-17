'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Typography, Popconfirm } from 'antd';
import {
  FilePdfOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Job } from '@/types';
import StatusBadge from './StatusBadge';
import PaymentModal from '../payment/PaymentModal';
import { useUploadStore } from '@/stores/uploadStore';

const { Text } = Typography;

interface JobsTableProps {
  jobs: Job[];
  loading?: boolean;
  onRefresh?: () => void;
  onCancelJob?: (id: string) => Promise<any>;
}

export default function JobsTable({ jobs, loading, onRefresh, onCancelJob }: JobsTableProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const { setProcessedFileInfo } = useUploadStore();

  const handleOpenPay = (job: Job) => {
    setSelectedJob(job);
    setProcessedFileInfo({
      jobId: job.id,
      originalFile: job.originalFile,
      originalName: job.originalName,
      fileSize: job.fileSize || 0,
      pageCount: job.pageCount || 1,
      colorPages: job.colorPages || [],
      bwPages: job.bwPages || 1,
    });
    setPaymentModalOpen(true);
  };

  const columns: ColumnsType<Job> = [
    {
      title: 'Document & Details',
      dataIndex: 'originalName',
      key: 'originalName',
      render: (text: string, record: Job) => (
        <Space>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#EEF2F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0B2545',
              fontSize: 18,
            }}
          >
            <FilePdfOutlined style={{ color: '#EF4444' }} />
          </div>
          <div>
            <Text strong style={{ fontSize: 14, color: '#0B2545' }}>{text}</Text>
            <div style={{ fontSize: 11, color: '#64748B' }}>
              {record.fileSize ? `${(record.fileSize / 1024).toFixed(0)} KB` : 'Document'} • Token #{record.id.slice(-5).toUpperCase()}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Page Analysis',
      key: 'pages',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={2}>
          <Text strong>{record.pageCount || 1} Total Pages</Text>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {record.colorPages && record.colorPages.length > 0 ? (
              <Tag color="volcano" style={{ fontSize: 11 }}>{record.colorPages.length} Color</Tag>
            ) : (
              <Tag color="default" style={{ fontSize: 11 }}>All B&amp;W</Tag>
            )}
            {record.duplex && <Tag color="blue" style={{ fontSize: 11 }}>Duplex</Tag>}
            {record.copies > 1 && <Tag color="purple" style={{ fontSize: 11 }}>{record.copies} sets</Tag>}
          </div>
        </Space>
      ),
    },
    {
      title: 'Tariff & Payment',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number, record: Job) => (
        <Space direction="vertical" size={2}>
          <Text strong style={{ color: '#0B2545', fontSize: 15 }}>
            ₹{(cost || 0).toFixed(2)}
          </Text>
          {record.paid ? (
            <Tag color="success" icon={<CheckCircleOutlined />} style={{ fontSize: 11 }}>
              Paid ({record.paymentMethod === 'counter' ? 'Counter' : 'Online'})
            </Tag>
          ) : (
            <Tag color="warning" style={{ fontSize: 11 }}>Payment Due</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Queue Status',
      key: 'status',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={4}>
          <StatusBadge status={record.status} />
          {record.status === 'QUEUED' && record.queuePosition && (
            <span className="fisat-gold-pill">
              FCFS #{record.queuePosition}
            </span>
          )}
          {record.status === 'COMPLETED' && (
            <Text type="secondary" style={{ fontSize: 11 }}>
              <EnvironmentOutlined /> Counter 1
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: 'Submission Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {new Date(date).toLocaleString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: Job) => {
        const canPay = !record.paid && record.status !== 'CANCELLED';
        const canCancel = ['PRICED', 'UPLOADED', 'QUEUED'].includes(record.status);

        return (
          <Space>
            {canPay && (
              <Button
                type="primary"
                size="small"
                icon={<CreditCardOutlined />}
                style={{ background: '#0B2545', borderColor: '#0B2545', fontWeight: 600 }}
                onClick={() => handleOpenPay(record)}
              >
                Pay &amp; Queue
              </Button>
            )}

            {canCancel && onCancelJob && (
              <Popconfirm
                title="Cancel Print Job?"
                description="Are you sure you want to cancel this submission?"
                onConfirm={() => onCancelJob(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" danger>
                  Cancel
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={jobs}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 8 }}
        style={{ borderRadius: 12, overflow: 'hidden' }}
      />

      <PaymentModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={() => {
          if (onRefresh) onRefresh();
        }}
      />
    </>
  );
}
