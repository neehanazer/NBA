'use client';

import React, { useState } from 'react';
import { Table, Button, Space, Tag, Typography, Popconfirm, message } from 'antd';
import {
  FilePdfOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CreditCardOutlined,
  EyeOutlined,
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
  const { setProcessedFileInfo, setStep } = useUploadStore();

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
      title: 'Document',
      dataIndex: 'originalName',
      key: 'originalName',
      render: (text: string, record: Job) => (
        <Space>
          <FilePdfOutlined style={{ color: '#ff4d4f', fontSize: 18 }} />
          <div>
            <Text strong style={{ fontSize: 14 }}>{text}</Text>
            <div style={{ fontSize: 11, color: '#8c8c8c' }}>
              {record.fileSize ? `${(record.fileSize / 1024).toFixed(0)} KB` : 'Document'}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Pages & Color',
      key: 'pages',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={2}>
          <Text>{record.pageCount || 1} pages total</Text>
          <div>
            {record.colorPages && record.colorPages.length > 0 ? (
              <Tag color="volcano">{record.colorPages.length} Color</Tag>
            ) : (
              <Tag color="default">All B&amp;W</Tag>
            )}
            {record.duplex && <Tag color="blue">Duplex</Tag>}
            {record.copies > 1 && <Tag color="purple">{record.copies} copies</Tag>}
          </div>
        </Space>
      ),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number, record: Job) => (
        <Space direction="vertical" size={2}>
          <Text strong style={{ color: '#1B3A5C' }}>
            ₹{(cost || 0).toFixed(2)}
          </Text>
          {record.paid ? (
            <Tag color="success" icon={<CheckCircleOutlined />}>
              Paid ({record.paymentMethod || 'Online'})
            </Tag>
          ) : (
            <Tag color="warning">Unpaid</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Queue / Status',
      key: 'status',
      render: (_: any, record: Job) => (
        <Space direction="vertical" size={4}>
          <StatusBadge status={record.status} />
          {record.status === 'QUEUED' && record.queuePosition && (
            <Tag color="geekblue">FCFS #{record.queuePosition}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Date',
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
                style={{ background: '#1B3A5C' }}
                onClick={() => handleOpenPay(record)}
              >
                Pay Now
              </Button>
            )}

            {canCancel && onCancelJob && (
              <Popconfirm
                title="Cancel Print Job?"
                description="Are you sure you want to cancel this job?"
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
        style={{ background: '#fff', borderRadius: 12, overflow: 'hidden' }}
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
