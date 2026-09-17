'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Tag, Progress, Space } from 'antd';
import { FieldTimeOutlined, NumberOutlined, TeamOutlined } from '@ant-design/icons';
import { useJobQueueStatus } from '@/hooks/useQueue';

interface QueuePositionProps {
  jobId: string;
}

export default function QueuePosition({ jobId }: QueuePositionProps) {
  const { queueStatus, isLoading } = useJobQueueStatus(jobId);

  if (isLoading || !queueStatus) {
    return null;
  }

  const { position, aheadCount, totalInQueue, estimatedWaitMinutes } = queueStatus;
  const progressPercent =
    totalInQueue > 0 ? Math.round(((totalInQueue - position + 1) / totalInQueue) * 100) : 100;

  return (
    <Card
      style={{
        borderRadius: 12,
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0fa 100%)',
        border: '1px solid #bae0ff',
        marginBottom: 16,
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8}>
          <Statistic
            title="Queue Position"
            value={position}
            prefix={<NumberOutlined style={{ color: '#1B3A5C' }} />}
            suffix={
              <Tag color="blue" style={{ marginLeft: 8 }}>
                FCFS #{position}
              </Tag>
            }
            valueStyle={{ color: '#1B3A5C', fontWeight: 700 }}
          />
        </Col>
        <Col xs={12} sm={8}>
          <Statistic
            title="Estimated Wait"
            value={estimatedWaitMinutes}
            suffix="min"
            prefix={<FieldTimeOutlined style={{ color: '#fa8c16' }} />}
            valueStyle={{ color: '#fa8c16' }}
          />
        </Col>
        <Col xs={12} sm={8}>
          <Statistic
            title="Jobs Ahead"
            value={aheadCount}
            prefix={<TeamOutlined style={{ color: '#52c41a' }} />}
            suffix={`of ${totalInQueue}`}
          />
        </Col>
        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#595959' }}>
              <span>Queue Progress</span>
              <span>{position === 1 ? 'Next to print!' : `${aheadCount} job(s) ahead`}</span>
            </div>
            <Progress
              percent={progressPercent}
              status={position === 1 ? 'success' : 'active'}
              strokeColor={{
                '0%': '#1B3A5C',
                '100%': '#52c41a',
              }}
              showInfo={false}
            />
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
