'use client';

import React from 'react';
import { Typography, Button, Space, Row, Col, Card, Tag } from 'antd';
import {
  PrinterOutlined,
  CloudUploadOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  RightOutlined,
  CheckCircleTwoTone,
} from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  return (
    <div style={{ padding: '24px 0 48px' }}>
      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1B3A5C 0%, #0d233a 100%)',
          borderRadius: 20,
          padding: '64px 48px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(27, 58, 92, 0.15)',
          marginBottom: 48,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <Tag
            color="orange"
            style={{
              marginBottom: 16,
              padding: '4px 12px',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Strict FCFS College Print Automation
          </Tag>

          <Title level={1} style={{ color: '#ffffff', fontSize: 44, marginBottom: 16, lineHeight: 1.15 }}>
            No more WhatsApp chaos. <br />
            Upload, price, and track your prints in real time.
          </Title>

          <Paragraph style={{ color: '#e2e8f0', fontSize: 18, marginBottom: 32, lineHeight: 1.6 }}>
            PrintQ replaces crowded counters and scattered WhatsApp messages with an automated First-Come,
            First-Served print queue. Automated per-page color detection, instant pricing, and live queue status.
          </Paragraph>

          <Space size="middle" wrap>
            <Link href="/upload">
              <Button
                type="primary"
                size="large"
                icon={<CloudUploadOutlined />}
                style={{
                  height: 48,
                  padding: '0 28px',
                  fontSize: 16,
                  borderRadius: 8,
                  background: '#fa8c16',
                  borderColor: '#fa8c16',
                  fontWeight: 600,
                }}
              >
                Upload &amp; Print Document
              </Button>
            </Link>

            <Link href="/login">
              <Button
                size="large"
                ghost
                style={{
                  height: 48,
                  padding: '0 24px',
                  fontSize: 16,
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                Sign In to My Jobs
              </Button>
            </Link>
          </Space>
        </div>
      </div>

      {/* Highlights Grid */}
      <Title level={3} style={{ textAlign: 'center', marginBottom: 32, color: '#1B3A5C' }}>
        Why College Students &amp; Operators Love PrintQ
      </Title>

      <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ borderRadius: 16, height: '100%', border: '1px solid #e2e8f0' }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#e6f7ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1890ff',
                fontSize: 24,
                marginBottom: 16,
              }}
            >
              <ClockCircleOutlined />
            </div>
            <Title level={4} style={{ color: '#1B3A5C', marginBottom: 8 }}>
              Strict FCFS Queue
            </Title>
            <Text type="secondary" style={{ lineHeight: 1.6 }}>
              Fair ordering guaranteed. Watch your position move up live as previous jobs complete without needing to
              crowd the counter.
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ borderRadius: 16, height: '100%', border: '1px solid #e2e8f0' }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#f6ffed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#52c41a',
                fontSize: 24,
                marginBottom: 16,
              }}
            >
              <ThunderboltOutlined />
            </div>
            <Title level={4} style={{ color: '#1B3A5C', marginBottom: 8 }}>
              Automated Page &amp; Color Scan
            </Title>
            <Text type="secondary" style={{ lineHeight: 1.6 }}>
              LibreOffice &amp; Ghostscript backend converts DOCX/PPTX to PDF and detects exact pages with color ink
              automatically.
            </Text>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ borderRadius: 16, height: '100%', border: '1px solid #e2e8f0' }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#fff7e6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fa8c16',
                fontSize: 24,
                marginBottom: 16,
              }}
            >
              <DollarOutlined />
            </div>
            <Title level={4} style={{ color: '#1B3A5C', marginBottom: 8 }}>
              Transparent Tariff
            </Title>
            <Text type="secondary" style={{ lineHeight: 1.6 }}>
              No surprises. Pay ₹2 for B&amp;W and ₹5 for color. Receive an automatic 10% discount on double-sided
              (duplex) printing.
            </Text>
          </Card>
        </Col>
      </Row>

      {/* Workflow Step Bar */}
      <Card
        style={{
          borderRadius: 16,
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          padding: '16px 24px',
        }}
      >
        <Title level={4} style={{ textAlign: 'center', marginBottom: 24 }}>
          How PrintQ Works in 4 Simple Steps
        </Title>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1B3A5C', marginBottom: 4 }}>1</div>
            <Text strong>Upload Document</Text>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>PDF, DOCX, PPTX, XLSX</div>
          </Col>
          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1B3A5C', marginBottom: 4 }}>2</div>
            <Text strong>Select Options</Text>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>Copies &amp; Duplex toggle</div>
          </Col>
          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#1B3A5C', marginBottom: 4 }}>3</div>
            <Text strong>Pay &amp; Queue</Text>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>Online or pay at counter</div>
          </Col>
          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#52c41a', marginBottom: 4 }}>4</div>
            <Text strong>Pick Up Prints</Text>
            <div style={{ fontSize: 12, color: '#8c8c8c' }}>Live position &amp; ETA</div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
