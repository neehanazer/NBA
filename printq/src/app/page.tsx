'use client';

import React from 'react';
import { Typography, Button, Space, Row, Col, Card, Tag, Divider, Statistic, Badge } from 'antd';
import {
  PrinterOutlined,
  CloudUploadOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  RightOutlined,
  CheckCircleTwoTone,
  FilePdfOutlined,
  BookOutlined,
  BankOutlined,
  TeamOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  return (
    <div style={{ padding: '8px 0 48px' }}>
      {/* Collegiate Hero Section */}
      <div
        className="fisat-hero-card"
        style={{
          borderRadius: 24,
          padding: '56px 48px',
          color: '#FFFFFF',
          boxShadow: '0 20px 40px -15px rgba(11, 37, 69, 0.4)',
          marginBottom: 40,
        }}
      >
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={15}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span className="fisat-gold-pill">
                <BankOutlined /> FISAT Central Reprographics
              </span>
              <Tag color="#134074" style={{ borderRadius: 12, border: 'none', color: '#E2E8F0', padding: '2px 10px' }}>
                Hormis Nagar Campus
              </Tag>
            </div>

            <Title
              level={1}
              style={{
                color: '#FFFFFF',
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.18,
                marginBottom: 16,
                letterSpacing: '-0.5px',
              }}
            >
              The Official Automated Print Hub for{' '}
              <span style={{ color: '#D4AF37' }}>FISAT College</span>
            </Title>

            <Paragraph
              style={{
                color: '#CBD5E1',
                fontSize: 16,
                lineHeight: 1.65,
                maxWidth: 640,
                marginBottom: 28,
              }}
            >
              No more manual WhatsApp file forwarding or waiting in crowded lines. Upload your lab records,
              seminar papers, and major project reports. Our automated pipeline scans color pages, applies student
              duplex discounts, and queues your document for high-speed pickup.
            </Paragraph>

            <Space size="middle" wrap>
              <Link href="/upload">
                <Button
                  type="primary"
                  size="large"
                  icon={<CloudUploadOutlined />}
                  style={{
                    height: 48,
                    padding: '0 32px',
                    fontSize: 15,
                    borderRadius: 10,
                    background: '#D4AF37',
                    borderColor: '#D4AF37',
                    color: '#0B2545',
                    fontWeight: 800,
                    boxShadow: '0 8px 20px rgba(212, 175, 55, 0.3)',
                  }}
                >
                  Upload &amp; Print Document
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  size="large"
                  ghost
                  style={{
                    height: 48,
                    padding: '0 24px',
                    fontSize: 15,
                    borderRadius: 10,
                    fontWeight: 700,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  View My Print Queue
                </Button>
              </Link>
            </Space>
          </Col>

          {/* Quick Info / Spooler Telemetry Card */}
          <Col xs={24} lg={9}>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 20,
                padding: '24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#F3C68F', letterSpacing: 0.5 }}>
                  CAMPUS PRINT TERMINAL STATUS
                </span>
                <span className="fisat-tag-live">
                  <span className="fisat-pulse-dot" />
                  <span style={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>Active</span>
                </span>
              </div>

              <Space direction="vertical" size={14} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 10 }}>
                  <Text style={{ color: '#94A3B8', fontSize: 13 }}>Primary Counter</Text>
                  <Text strong style={{ color: '#FFFFFF', fontSize: 13 }}>Main Block Ground Floor</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 10 }}>
                  <Text style={{ color: '#94A3B8', fontSize: 13 }}>Standard B&amp;W Tariff</Text>
                  <Text strong style={{ color: '#FFFFFF', fontSize: 13 }}>₹2.00 / page</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 10 }}>
                  <Text style={{ color: '#94A3B8', fontSize: 13 }}>Color Ink Tariff</Text>
                  <Text strong style={{ color: '#F3C68F', fontSize: 13 }}>₹5.00 / page</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 4 }}>
                  <Text style={{ color: '#94A3B8', fontSize: 13 }}>Double-Sided Discount</Text>
                  <Tag color="green" style={{ margin: 0, fontWeight: 700 }}>10% Eco Savings</Tag>
                </div>
              </Space>

              <div
                style={{
                  marginTop: 18,
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'rgba(11, 37, 69, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <ThunderboltOutlined style={{ color: '#D4AF37', fontSize: 18 }} />
                <span style={{ fontSize: 12, color: '#E2E8F0' }}>
                  Average wait time today: <strong>~4 minutes</strong> per job
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Campus Facility Highlights */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Tag color="blue" style={{ marginBottom: 8, fontWeight: 700 }}>
            COLLEGE SERVICES &amp; TARIFFS
          </Tag>
          <Title level={2} style={{ color: '#0B2545', margin: 0 }}>
            Built for FISAT Academic Requirements
          </Title>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card
              hoverable
              className="fisat-card-hover"
              style={{ borderRadius: 16, height: '100%' }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: '#EEF2F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0B2545',
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                <FilePdfOutlined />
              </div>
              <Title level={4} style={{ color: '#0B2545', marginBottom: 8 }}>
                Lab Manuals &amp; Records
              </Title>
              <Text type="secondary" style={{ lineHeight: 1.6 }}>
                Automated detection for B&amp;W code text and color circuit diagrams. No more manual counting
                of color pages at the shop desk.
              </Text>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              hoverable
              className="fisat-card-hover"
              style={{ borderRadius: 16, height: '100%' }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D97706',
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                <BookOutlined />
              </div>
              <Title level={4} style={{ color: '#0B2545', marginBottom: 8 }}>
                Project &amp; Seminar Reports
              </Title>
              <Text type="secondary" style={{ lineHeight: 1.6 }}>
                Supports multi-copy printing with duplex pagination according to KTU/Autonomous guidelines.
                Includes paper-saving duplex discounts.
              </Text>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              hoverable
              className="fisat-card-hover"
              style={{ borderRadius: 16, height: '100%' }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: '#ECFDF5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                <ClockCircleOutlined />
              </div>
              <Title level={4} style={{ color: '#0B2545', marginBottom: 8 }}>
                Strict First-Come, First-Served
              </Title>
              <Text type="secondary" style={{ lineHeight: 1.6 }}>
                Every verified student submission is placed in a timestamped FIFO queue. Watch your position
                move forward in real-time from anywhere on campus.
              </Text>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 4-Step Student Workflow Bar */}
      <Card
        style={{
          borderRadius: 20,
          background: '#FFFFFF',
          padding: '20px 24px',
          boxShadow: '0 4px 20px -4px rgba(11, 37, 69, 0.05)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={4} style={{ color: '#0B2545', margin: 0 }}>
            How to Use the FISAT PrintQ System
          </Title>
          <Text type="secondary">From upload to counter pickup in minutes</Text>
        </div>

        <Row gutter={[20, 20]} align="middle">
          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#0B2545',
                color: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 800,
                margin: '0 auto 10px',
              }}
            >
              1
            </div>
            <Text strong style={{ fontSize: 14 }}>Upload Document</Text>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
              PDF, Word, PPTX or Excel
            </div>
          </Col>

          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#0B2545',
                color: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 800,
                margin: '0 auto 10px',
              }}
            >
              2
            </div>
            <Text strong style={{ fontSize: 14 }}>Automatic Analysis</Text>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
              Page count &amp; color detected
            </div>
          </Col>

          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#0B2545',
                color: '#D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 800,
                margin: '0 auto 10px',
              }}
            >
              3
            </div>
            <Text strong style={{ fontSize: 14 }}>Confirm &amp; Queue</Text>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
              Pay online or at counter
            </div>
          </Col>

          <Col xs={24} sm={6} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#10B981',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 800,
                margin: '0 auto 10px',
              }}
            >
              4
            </div>
            <Text strong style={{ fontSize: 14 }}>Pick Up Prints</Text>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
              Collect from Main Block Counter
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
