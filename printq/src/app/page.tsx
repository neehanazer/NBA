'use client';

import React from 'react';
import { Row, Col, Tag, Button } from 'antd';
import {
  CloudUploadOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
  ArrowRightOutlined,
  PrinterOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Arsha Hero Section */}
      <section
        style={{
          background: '#37517e',
          borderRadius: 24,
          padding: '72px 48px 64px',
          color: '#FFFFFF',
          marginBottom: 48,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 45px rgba(55, 81, 126, 0.25)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(71, 178, 228, 0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <Row gutter={[40, 40]} align="middle">
          {/* Left Column: Headline & Action Buttons */}
          <Col xs={24} lg={14}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <span
                style={{
                  background: 'rgba(71, 178, 228, 0.2)',
                  border: '1px solid rgba(71, 178, 228, 0.4)',
                  color: '#47b2e4',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  padding: '4px 14px',
                  borderRadius: 50,
                  fontFamily: "'Jost', sans-serif",
                }}
              >
                FISAT Central Reprographics
              </span>
              <Tag
                color="cyan"
                style={{
                  borderRadius: 50,
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  padding: '2px 12px',
                }}
              >
                Autonomous
              </Tag>
            </div>

            <h1
              style={{
                fontSize: 46,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: 16,
                fontFamily: "'Jost', sans-serif",
                letterSpacing: '-0.5px',
              }}
            >
              Better Solutions For <span style={{ color: '#47b2e4' }}>Campus Printing</span>
            </h1>

            <p
              style={{
                fontSize: 18,
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.6,
                maxWidth: 580,
                marginBottom: 32,
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              Automated First-Come, First-Served document printing for FISAT students &amp; faculty. Upload your files online, monitor queue position in real-time, and pick up prints at Counter 1.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/upload">
                <Button className="btn-arsha-primary" icon={<CloudUploadOutlined />}>
                  Get Started
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button className="btn-arsha-outline" icon={<ClockCircleOutlined />}>
                  Live Queue Telemetry
                </Button>
              </Link>
            </div>
          </Col>

          {/* Right Column: Hero Graphic with Arsha Floating Animation */}
          <Col xs={24} lg={10} style={{ textAlign: 'center' }}>
            <div
              className="arsha-animated"
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                borderRadius: 24,
                padding: '36px 32px',
                maxWidth: 380,
                width: '100%',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  margin: '0 auto 20px',
                  borderRadius: 20,
                  background: '#FFFFFF',
                  padding: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                }}
              >
                <img
                  src="/fisat-official-logo.png"
                  alt="FISAT Official Emblem"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, margin: '0 0 6px', fontFamily: "'Jost', sans-serif" }}>
                Main Block Spooler
              </h3>
              <p style={{ color: '#47b2e4', fontSize: 13, fontWeight: 600, marginBottom: 20, fontFamily: "'Poppins', sans-serif" }}>
                GROUND FLOOR • COUNTER 1
              </p>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 12,
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 13,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#FFFFFF' }}>
                  <span className="fisat-pulse-dot" /> Online
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>~4 min avg turn</span>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      {/* Arsha Clients / Accreditation Strip */}
      <div
        style={{
          background: '#f3f5fa',
          borderRadius: 16,
          padding: '20px 32px',
          marginBottom: 60,
          border: '1px solid #eef2f6',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
            opacity: 0.8,
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 14, color: '#37517e', letterSpacing: 1 }}>FISAT AUTONOMOUS</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span style={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>NAAC &apos;A+&apos; GRADE</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span style={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>NBA ACCREDITED</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span style={{ fontWeight: 700, fontSize: 13, color: '#64748b' }}>KTU AFFILIATED</span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span style={{ fontWeight: 700, fontSize: 13, color: '#47b2e4' }}>CENTRAL REPROGRAPHICS</span>
        </div>
      </div>

      {/* Arsha Services Section */}
      <section style={{ marginBottom: 64 }}>
        <div className="arsha-section-title">
          <h2>Services</h2>
          <p>
            Designed specifically for student lab records, major project reports, and seminar slides.
          </p>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className="arsha-card">
              <div className="arsha-icon-box">
                <CloudUploadOutlined />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#37517e', fontFamily: "'Jost', sans-serif" }}>
                Instant Document Scanner
              </h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Upload PDF, Word, or PowerPoint files. Ghostscript analysis scans color pages and computes tariff instantly.
              </p>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="arsha-card">
              <div className="arsha-icon-box">
                <ClockCircleOutlined />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#37517e', fontFamily: "'Jost', sans-serif" }}>
                Strict FCFS Queue
              </h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Every submission gets a timestamped token. Monitor queue position and estimated turnaround time in real-time.
              </p>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="arsha-card">
              <div className="arsha-icon-box">
                <ThunderboltOutlined />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#37517e', fontFamily: "'Jost', sans-serif" }}>
                Eco Duplex Discount
              </h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Subsidized student tariff with automatic 10% eco savings on duplex printing compliant with KTU report guidelines.
              </p>
            </div>
          </Col>
        </Row>
      </section>

      {/* Arsha Pricing Section */}
      <section style={{ marginBottom: 64 }}>
        <div className="arsha-section-title">
          <h2>Pricing</h2>
          <p>
            Official subsidized rates approved by the FISAT Central Reprographics Committee.
          </p>
        </div>

        <Row gutter={[24, 24]} align="stretch">
          <Col xs={24} md={8}>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '36px 28px',
                boxShadow: '0 5px 25px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#37517e', fontFamily: "'Jost', sans-serif", marginBottom: 8 }}>
                  Standard B&amp;W
                </h3>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#37517e', fontFamily: "'Jost', sans-serif", marginBottom: 16 }}>
                  ₹2.00 <span style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8' }}>/ page</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', color: '#64748b', fontSize: 14, lineHeight: 2 }}>
                  <li><CheckCircleFilled style={{ color: '#47b2e4', marginRight: 8 }} /> High-speed 1200 DPI laser</li>
                  <li><CheckCircleFilled style={{ color: '#47b2e4', marginRight: 8 }} /> Lab manuals &amp; assignments</li>
                  <li><CheckCircleFilled style={{ color: '#47b2e4', marginRight: 8 }} /> 75 GSM A4 Bond paper</li>
                </ul>
              </div>

              <Link href="/upload">
                <Button
                  style={{
                    width: '100%',
                    borderRadius: 50,
                    borderColor: '#47b2e4',
                    color: '#47b2e4',
                    fontWeight: 600,
                    fontFamily: "'Jost', sans-serif",
                    height: 42,
                  }}
                >
                  Print B&amp;W
                </Button>
              </Link>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '36px 28px',
                boxShadow: '0 10px 35px rgba(71, 178, 228, 0.2)',
                borderTop: '4px solid #47b2e4',
                border: '1px solid #e2e8f0',
                borderTopColor: '#47b2e4',
                borderTopWidth: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: -14, right: 24 }}>
                <span
                  style={{
                    background: '#47b2e4',
                    color: '#FFFFFF',
                    borderRadius: 50,
                    padding: '4px 16px',
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  Featured
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#37517e', fontFamily: "'Jost', sans-serif", marginBottom: 8 }}>
                  Color Graphics
                </h3>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#47b2e4', fontFamily: "'Jost', sans-serif", marginBottom: 16 }}>
                  ₹5.00 <span style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8' }}>/ page</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', color: '#64748b', fontSize: 14, lineHeight: 2 }}>
                  <li><CheckCircleFilled style={{ color: '#47b2e4', marginRight: 8 }} /> Auto color page detection</li>
                  <li><CheckCircleFilled style={{ color: '#47b2e4', marginRight: 8 }} /> Circuit diagrams &amp; charts</li>
                  <li><CheckCircleFilled style={{ color: '#47b2e4', marginRight: 8 }} /> Seminar presentation slides</li>
                </ul>
              </div>

              <Link href="/upload">
                <Button
                  className="btn-arsha-primary"
                  style={{ width: '100%', height: 42 }}
                >
                  Print Color
                </Button>
              </Link>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '36px 28px',
                boxShadow: '0 5px 25px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e2e8f0',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#37517e', fontFamily: "'Jost', sans-serif", marginBottom: 8 }}>
                  Duplex Eco
                </h3>
                <div style={{ fontSize: 36, fontWeight: 700, color: '#10B981', fontFamily: "'Jost', sans-serif", marginBottom: 16 }}>
                  10% <span style={{ fontSize: 14, fontWeight: 500, color: '#94a3b8' }}>discount</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', color: '#64748b', fontSize: 14, lineHeight: 2 }}>
                  <li><CheckCircleFilled style={{ color: '#47b2e4', marginRight: 8 }} /> KTU project report format</li>
                  <li><CheckCircleFilled style={{ color: '#47b2e4', marginRight: 8 }} /> Paper saving double-sided</li>
                  <li><CheckCircleFilled style={{ color: '#47b2e4', marginRight: 8 }} /> Applied on total page count</li>
                </ul>
              </div>

              <Link href="/upload">
                <Button
                  style={{
                    width: '100%',
                    borderRadius: 50,
                    borderColor: '#10B981',
                    color: '#10B981',
                    fontWeight: 600,
                    fontFamily: "'Jost', sans-serif",
                    height: 42,
                  }}
                >
                  Choose Duplex
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </section>

      {/* Arsha Call To Action (CTA) Section */}
      <section
        style={{
          background: '#37517e',
          borderRadius: 20,
          padding: '48px 40px',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 15px 35px rgba(55, 81, 126, 0.2)',
        }}
      >
        <h2 style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 700, marginBottom: 12, fontFamily: "'Jost', sans-serif" }}>
          Ready to Print Your Academic Documents?
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 16, maxWidth: 600, margin: '0 auto 28px', fontFamily: "'Open Sans', sans-serif" }}>
          Submit your file online, track queue progress on your phone, and collect your prints at Main Block Counter 1.
        </p>
        <Link href="/upload">
          <Button
            className="btn-arsha-primary"
            icon={<ArrowRightOutlined />}
            style={{ fontSize: 16, padding: '12px 36px', height: 'auto' }}
          >
            Upload Document Now
          </Button>
        </Link>
      </section>
    </div>
  );
}
