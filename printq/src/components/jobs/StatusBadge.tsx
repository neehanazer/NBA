'use client';

import React from 'react';
import { Tag } from 'antd';
import {
  ClockCircleOutlined,
  SyncOutlined,
  PrinterOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
  DollarCircleOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { JobStatus } from '@/types';

interface StatusBadgeProps {
  status: JobStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case 'UPLOADED':
      return <Tag icon={<FileDoneOutlined />}>Uploaded</Tag>;
    case 'CONVERTING':
      return (
        <Tag icon={<SyncOutlined spin />} color="blue">
          Converting
        </Tag>
      );
    case 'ANALYZED':
      return (
        <Tag icon={<SyncOutlined />} color="cyan">
          Analyzed
        </Tag>
      );
    case 'PRICED':
      return (
        <Tag icon={<DollarCircleOutlined />} color="orange">
          Awaiting Payment
        </Tag>
      );
    case 'QUEUED':
      return (
        <Tag icon={<ClockCircleOutlined />} color="purple">
          In FCFS Queue
        </Tag>
      );
    case 'PRINTING':
      return (
        <Tag icon={<PrinterOutlined spin />} color="gold">
          Printing Now
        </Tag>
      );
    case 'COMPLETED':
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Ready for Pickup
        </Tag>
      );
    case 'FAILED':
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Failed
        </Tag>
      );
    case 'CANCELLED':
      return (
        <Tag icon={<StopOutlined />} color="default">
          Cancelled
        </Tag>
      );
    default:
      return <Tag>{status}</Tag>;
  }
}
