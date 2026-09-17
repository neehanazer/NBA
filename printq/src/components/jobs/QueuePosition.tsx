'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Tag, Progress, Space, Typography } from 'antd';
import { FieldTimeOutlined, NumberOutlined, TeamOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useJobQueueStatus } from '@/hooks/useQueue';

const { Text } = Typography;

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
        borderRadius: 16,
        background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%)',
        border: '1.5px solid #CBD5E1',
        boxShadow: '0 4px 12px rgba(11, 37, 69, 0.05)',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Space size="small">
          <span className="fisat-pulse-dot" />
          <Text strong style={{ color: '#0B2545', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Live FISAT Queue Telemetry
          </Text>
        </Space>
        <Tag color="#0B2545" icon={<EnvironmentOutlined />} style={{ borderRadius: 6, margin: 0 }}>
          Counter 1 Spooler
        </Tag>
      </div>

      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8}>
          <Statistic
            title={<span style={{ fontWeight: 600, color: '#64748B' }}>Your FCFS Position</span>}
            value={position}
            prefix={<NumberOutlined style={{ color: '#0B2545' }} />}
            suffix={
              <span className="fisat-gold-pill" style={{ marginLeft: 6 }}>
                #{position}
              </span>
            }
            valueStyle={{ color: '#0B2545', fontWeight: 900, fontSize: 32 }}
          />
        </Col>

        <Col xs={12} sm={8}>
          <Statistic
            title={<span style={{ fontWeight: 600, color: '#64748B' }}>Estimated Wait</span>}
            value={estimatedWaitMinutes}
            suffix="min"
            prefix={<FieldTimeOutlined style={{ color: '#D97706' }} />}
            valueStyle={{ color: '#D97706', fontWeight: 800 }}
          />
        </Col>

        <Col xs={12} sm={8}>
          <Statistic
            title={<span style={{ fontWeight: 600, color: '#64748B' }}>Jobs Ahead</span>}
            value={aheadCount}
            prefix={<TeamOutlined style={{ color: '#10B981' }} />}
            suffix={`of ${totalInQueue}`}
            valueStyle={{ color: '#10B981', fontWeight: 800 }}
          />
        </Col>

        <Col span={24}>
          <Space direction="vertical" style={{ width: '100%' }} size={4}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748B', fontWeight: 600 }}>
              <span>Spool Progress</span>
              <span>
                {position === 1 ? '🎉 Your job is next to print!' : `${aheadCount} document(s) ahead in queue`}
              </span>
            </div>
            <Progress
              percent={progressPercent}
              status={position === 1 ? 'success' : 'active'}
              strokeColor={{
                '0%': '#0B2545',
                '70%': '#134074',
                '100%': '#10B981',
              }}
              size={['100%', 10]}
              showInfo={false}
            />
          </Space>
        </Col>
      </Row>
    </Card>
  );
}
