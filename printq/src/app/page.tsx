'use client';

import React from 'react';
import { Typography, Button, Space, Row, Col, Card, Tag } from 'antd';
import {
  CloudUploadOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function HomePage() {
  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: '16px 0 48px' }}>
      {/* Sleek Minimalist Hero */}
      <div
        className="fisat-hero-card"
        style={{
          borderRadius: 24,
          padding: '56px 40px',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 20px 40px -15px rgba(11, 37, 69, 0.35)',
          marginBottom: 32,
          position: 'relative',
        }}
      >
        {/* Institutional Pill Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <img
            src="/fisat-official-logo.png"
            alt="FISAT Official Crest"
            style={{
              width: 38,
              height: 38,
              objectFit: 'contain',
              borderRadius: 8,
              background: '#FFFFFF',
              padding: 2,
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          />
          <span className="fisat-gold-pill" style={{ letterSpacing: '0.6px' }}>
            FISAT REPROGRAPHICS
          </span>
          <Tag color="#134074" style={{ borderRadius: 12, border: 'none', color: '#E2E8F0', padding: '2px 10px', margin: 0 }}>
            Counter 1 • Main Block
          </Tag>
        </div>

        {/* Punchy, Minimal Title */}
        <Title
          level={1}
          style={{
            color: '#FFFFFF',
            fontSize: 42,
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: 12,
            letterSpacing: '-0.5px',
          }}
        >
          Campus Printing, <span style={{ color: '#D4AF37' }}>Simplified.</span>
        </Title>

        <Paragraph
          style={{
            color: '#CBD5E1',
            fontSize: 16,
            maxWidth: 560,
            margin: '0 auto 32px',
            lineHeight: 1.5,
          }}
        >
          Send your academic documents to the college print queue online and collect your prints at Counter 1 without the line.
        </Paragraph>

        {/* Primary Actions */}
        <Space size="middle" wrap style={{ justifyContent: 'center', marginBottom: 36 }}>
          <Link href="/upload">
            <Button
              type="primary"
              size="large"
              icon={<CloudUploadOutlined />}
              style={{
                height: 50,
                padding: '0 32px',
                fontSize: 16,
                borderRadius: 12,
                background: '#D4AF37',
                borderColor: '#D4AF37',
                color: '#0B2545',
                fontWeight: 800,
                boxShadow: '0 8px 24px rgba(212, 175, 55, 0.35)',
              }}
            >
              Print Document
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              size="large"
              ghost
              icon={<ClockCircleOutlined />}
              style={{
                height: 50,
                padding: '0 26px',
                fontSize: 15,
                borderRadius: 12,
                fontWeight: 700,
                borderColor: 'rgba(255, 255, 255, 0.4)',
              }}
            >
              Track Queue
            </Button>
          </Link>
        </Space>

        {/* Minimal Live Status Bar */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 24,
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 9999,
            padding: '8px 24px',
            fontSize: 13,
            color: '#E2E8F0',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span className="fisat-pulse-dot" /> Spooler Online
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>•</span>
          <span>₹2.00 B&amp;W</span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>•</span>
          <span style={{ color: '#F3C68F', fontWeight: 600 }}>₹5.00 Color</span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>•</span>
          <span>10% Duplex Savings</span>
        </div>
      </div>

      {/* Clean 3-Step Flow */}
      <Row gutter={[20, 20]} style={{ marginBottom: 32 }}>
        <Col xs={24} md={8}>
          <Card
            bordered={false}
            className="fisat-card-hover"
            style={{
              borderRadius: 16,
              background: '#FFFFFF',
              boxShadow: '0 2px 10px rgba(11, 37, 69, 0.04)',
              border: '1px solid #E2E8F0',
              height: '100%',
              padding: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#EEF2F6',
                  color: '#0B2545',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                <CloudUploadOutlined />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Step 1</div>
                <Text strong style={{ fontSize: 16, color: '#0B2545' }}>Upload File</Text>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>PDF, Word, or PPTX</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            bordered={false}
            className="fisat-card-hover"
            style={{
              borderRadius: 16,
              background: '#FFFFFF',
              boxShadow: '0 2px 10px rgba(11, 37, 69, 0.04)',
              border: '1px solid #E2E8F0',
              height: '100%',
              padding: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#FEF3C7',
                  color: '#D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                <ThunderboltOutlined />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Step 2</div>
                <Text strong style={{ fontSize: 16, color: '#0B2545' }}>Auto-Pricing</Text>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Color &amp; duplex detected</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card
            bordered={false}
            className="fisat-card-hover"
            style={{
              borderRadius: 16,
              background: '#FFFFFF',
              boxShadow: '0 2px 10px rgba(11, 37, 69, 0.04)',
              border: '1px solid #E2E8F0',
              height: '100%',
              padding: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: '#ECFDF5',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                <EnvironmentOutlined />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Step 3</div>
                <Text strong style={{ fontSize: 16, color: '#0B2545' }}>Pickup Prints</Text>
                <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Main Block Counter 1</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Minimalist Subsidized Rates & Information Strip */}
      <Card
        style={{
          borderRadius: 20,
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 12px rgba(11, 37, 69, 0.04)',
          padding: '12px 16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src="/fisat-official-logo.png"
              alt="FISAT"
              style={{ width: 40, height: 40, objectFit: 'contain' }}
            />
            <div>
              <div style={{ fontWeight: 800, color: '#0B2545', fontSize: 15 }}>
                FISAT Central Reprographics Facility
              </div>
              <div style={{ fontSize: 12, color: '#64748B' }}>
                Main Block Ground Floor • Mon–Sat, 8:30 AM – 5:30 PM
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>BLACK &amp; WHITE</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#0B2545' }}>₹2.00 / page</div>
            </div>
            <div style={{ height: 28, width: 1, background: '#E2E8F0' }} />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 600 }}>COLOR</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#D97706' }}>₹5.00 / page</div>
            </div>
            <div style={{ height: 28, width: 1, background: '#E2E8F0' }} />
            <Link href="/upload">
              <Button
                type="primary"
                style={{
                  background: '#0B2545',
                  borderColor: '#0B2545',
                  borderRadius: 8,
                  fontWeight: 700,
                }}
                icon={<ArrowRightOutlined />}
              >
                Start Printing
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
