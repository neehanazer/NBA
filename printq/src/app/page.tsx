'use client';

import React, { useRef } from 'react';
import { Row, Col, Tag, Button } from 'antd';
import {
  CloudUploadOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  CheckCircleFilled,
  ArrowRightOutlined,
  PrinterOutlined,
  SafetyCertificateOutlined,
  DashboardOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register useGSAP plugin
gsap.registerPlugin(useGSAP);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Animations with Timeline and cleanProps
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // 1. Hero elements entrance
      tl.fromTo(
        '.strive-hero-anim',
        { y: 35, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.1,
          clearProps: 'transform,opacity,visibility',
        }
      );

      // 2. Accreditation items
      tl.fromTo(
        '.strive-stat-item',
        { y: 15, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          stagger: 0.06,
          clearProps: 'transform,opacity,visibility',
        },
        '-=0.2'
      );

      // 3. Strive Services cards
      tl.fromTo(
        '.strive-service-anim',
        { y: 35, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.1,
          clearProps: 'transform,opacity,visibility',
        },
        '-=0.15'
      );

      // 4. Feature highlight items
      tl.fromTo(
        '.strive-feature-anim',
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.08,
          clearProps: 'transform,opacity,visibility',
        },
        '-=0.15'
      );

      // 5. Strive Pricing cards
      tl.fromTo(
        '.strive-pricing-anim',
        { y: 35, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.1,
          clearProps: 'transform,opacity,visibility',
        },
        '-=0.15'
      );

      // 6. Smooth floating telemetry card (infinite loop)
      gsap.to('.strive-floating-telemetry', {
        y: -12,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} style={{ paddingBottom: 40 }}>
      {/* BootstrapMade Strive Hero Section */}
      <section className="strive-hero-container">
        <div className="strive-hero-glow" />

        <Row gutter={[48, 48]} align="middle">
          {/* Left Column: Headline & Action Buttons */}
          <Col xs={24} lg={14}>
            <div className="strive-hero-anim" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span
                style={{
                  background: 'rgba(234, 124, 0, 0.18)',
                  border: '1px solid rgba(234, 124, 0, 0.45)',
                  color: '#ea7c00',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  padding: '5px 16px',
                  borderRadius: 50,
                  fontFamily: "'Ubuntu', sans-serif",
                }}
              >
                FISAT Central Reprographics
              </span>
              <Tag
                color="orange"
                style={{
                  borderRadius: 50,
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  padding: '2px 14px',
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: 12,
                }}
              >
                Autonomous
              </Tag>
            </div>

            <h1
              className="strive-hero-anim"
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: 20,
                fontFamily: "'Nunito', sans-serif",
                letterSpacing: '-0.5px',
              }}
            >
              Building Trust, Driving Speed in <span style={{ color: '#ea7c00' }}>Campus Printing</span>
            </h1>

            <p
              className="strive-hero-anim"
              style={{
                fontSize: 17,
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.7,
                maxWidth: 580,
                marginBottom: 36,
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              Automated First-Come, First-Served document printing for FISAT students &amp; faculty. Upload your files online, monitor queue position in real-time, and pick up prints cleanly at Counter 1.
            </p>

            <div className="strive-hero-anim" style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
              <Link href="/upload">
                <Button className="btn-strive-primary" icon={<CloudUploadOutlined />}>
                  Get Started
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button className="btn-strive-outline" icon={<ClockCircleOutlined />}>
                  Live Queue Telemetry
                </Button>
              </Link>
            </div>
          </Col>

          {/* Right Column: Hero Graphic with GSAP Floating Animation */}
          <Col xs={24} lg={10} style={{ textAlign: 'center' }}>
            <div
              className="strive-floating-telemetry"
              style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 24,
                padding: '40px 32px',
                maxWidth: 380,
                width: '100%',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.45)',
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  margin: '0 auto 22px',
                  borderRadius: 20,
                  background: '#FFFFFF',
                  padding: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                }}
              >
                <img
                  src="/fisat-official-logo.png"
                  alt="FISAT Official Emblem"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <h3 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 800, margin: '0 0 6px', fontFamily: "'Nunito', sans-serif" }}>
                Main Block Spooler
              </h3>
              <p style={{ color: '#ea7c00', fontSize: 13, fontWeight: 700, marginBottom: 22, fontFamily: "'Ubuntu', sans-serif", letterSpacing: 1 }}>
                GROUND FLOOR • COUNTER 1
              </p>

              <div
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  borderRadius: 14,
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 13,
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#FFFFFF', fontWeight: 500 }}>
                  <span className="fisat-pulse-dot" /> Online Spooler
                </span>
                <span style={{ color: '#ea7c00', fontWeight: 600 }}>~4 min avg turn</span>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      {/* BootstrapMade Strive Accreditation / Stats Strip */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: 16,
          padding: '22px 32px',
          marginBottom: 64,
          border: '1px solid var(--strive-border)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <span className="strive-stat-item" style={{ fontWeight: 800, fontSize: 14, color: '#060606', letterSpacing: 1, fontFamily: "'Nunito', sans-serif" }}>
            FISAT AUTONOMOUS
          </span>
          <span style={{ color: '#ea7c00' }}>•</span>
          <span className="strive-stat-item" style={{ fontWeight: 700, fontSize: 13, color: '#555555', fontFamily: "'Ubuntu', sans-serif" }}>
            NAAC &apos;A+&apos; GRADE
          </span>
          <span style={{ color: '#ea7c00' }}>•</span>
          <span className="strive-stat-item" style={{ fontWeight: 700, fontSize: 13, color: '#555555', fontFamily: "'Ubuntu', sans-serif" }}>
            NBA ACCREDITED
          </span>
          <span style={{ color: '#ea7c00' }}>•</span>
          <span className="strive-stat-item" style={{ fontWeight: 700, fontSize: 13, color: '#555555', fontFamily: "'Ubuntu', sans-serif" }}>
            KTU AFFILIATED
          </span>
          <span style={{ color: '#ea7c00' }}>•</span>
          <span className="strive-stat-item" style={{ fontWeight: 700, fontSize: 13, color: '#ea7c00', fontFamily: "'Ubuntu', sans-serif" }}>
            CENTRAL REPROGRAPHICS
          </span>
        </div>
      </div>

      {/* BootstrapMade Strive Services Section */}
      <section style={{ marginBottom: 72 }}>
        <div className="strive-section-title">
          <h2>Services</h2>
          <p>
            High-throughput document processing optimized for lab records, major project reports, and campus seminars.
          </p>
        </div>

        <Row gutter={[28, 28]}>
          <Col xs={24} md={8}>
            <div className="strive-card strive-service-anim">
              <div className="strive-icon-box">
                <CloudUploadOutlined />
              </div>
              <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 12, color: 'var(--strive-heading)' }}>
                Instant Document Scanner
              </h3>
              <p style={{ color: 'var(--strive-text)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Upload PDF, Word, or PowerPoint files. Ghostscript analysis scans color pages and calculates official tariff instantly.
              </p>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="strive-card strive-service-anim">
              <div className="strive-icon-box">
                <ClockCircleOutlined />
              </div>
              <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 12, color: 'var(--strive-heading)' }}>
                Strict FCFS Queue
              </h3>
              <p style={{ color: 'var(--strive-text)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Every submission gets a timestamped token with zero queue jumping. Monitor your position and estimated turnaround live.
              </p>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="strive-card strive-service-anim">
              <div className="strive-icon-box">
                <ThunderboltOutlined />
              </div>
              <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 12, color: 'var(--strive-heading)' }}>
                Eco Duplex Discount
              </h3>
              <p style={{ color: 'var(--strive-text)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                Subsidized student tariff with automatic 10% eco savings on duplex printing compliant with KTU report guidelines.
              </p>
            </div>
          </Col>
        </Row>
      </section>

      {/* Strive Features Grid */}
      <section style={{ marginBottom: 72 }}>
        <div className="strive-section-title">
          <h2>Why Choose PrintQ</h2>
          <p>
            Engineered specifically to solve the morning rush at FISAT Reprographics Centre.
          </p>
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <div className="strive-card strive-feature-anim" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ fontSize: 32, color: '#ea7c00', marginBottom: 16 }}>
                <PrinterOutlined />
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Zero Counter Wait</h4>
              <p style={{ color: 'var(--strive-muted)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Submit from hostel or classroom. Your prints are already ready when you reach Counter 1.
              </p>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <div className="strive-card strive-feature-anim" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ fontSize: 32, color: '#ea7c00', marginBottom: 16 }}>
                <DashboardOutlined />
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Live Telemetry</h4>
              <p style={{ color: 'var(--strive-muted)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Real-time queue depth tracking with SSE updates. No manual page refresh required.
              </p>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <div className="strive-card strive-feature-anim" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ fontSize: 32, color: '#ea7c00', marginBottom: 16 }}>
                <SafetyCertificateOutlined />
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Secure Tokens</h4>
              <p style={{ color: 'var(--strive-muted)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Unique claim code for every print job ensures no student picks up another&apos;s records.
              </p>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <div className="strive-card strive-feature-anim" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ fontSize: 32, color: '#ea7c00', marginBottom: 16 }}>
                <FileProtectOutlined />
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>KTU Formatting</h4>
              <p style={{ color: 'var(--strive-muted)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Standard 75 GSM A4 paper, proper binding margins, and exact color page placement.
              </p>
            </div>
          </Col>
        </Row>
      </section>

      {/* BootstrapMade Strive Pricing Section */}
      <section style={{ marginBottom: 72 }}>
        <div className="strive-section-title">
          <h2>Pricing</h2>
          <p>
            Official subsidized rates approved by the FISAT Central Reprographics Committee.
          </p>
        </div>

        <Row gutter={[28, 28]} align="stretch">
          <Col xs={24} md={8}>
            <div className="strive-pricing-card strive-pricing-anim">
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--strive-heading)', marginBottom: 8 }}>
                  Standard B&amp;W
                </h3>
                <div style={{ fontSize: 38, fontWeight: 800, color: 'var(--strive-heading)', marginBottom: 18 }}>
                  ₹2.00 <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--strive-muted)' }}>/ page</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', color: 'var(--strive-text)', fontSize: 14, lineHeight: 2.2 }}>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> High-speed 1200 DPI laser</li>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> Lab manuals &amp; assignments</li>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> 75 GSM A4 Bond paper</li>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> Counter 1 direct collection</li>
                </ul>
              </div>

              <Link href="/upload">
                <Button
                  style={{
                    width: '100%',
                    borderRadius: 50,
                    borderColor: '#ea7c00',
                    color: '#ea7c00',
                    fontWeight: 600,
                    fontFamily: "'Ubuntu', sans-serif",
                    height: 44,
                  }}
                >
                  Print B&amp;W
                </Button>
              </Link>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="strive-pricing-card strive-pricing-featured strive-pricing-anim">
              <div style={{ position: 'absolute', top: -14, right: 24 }}>
                <span
                  style={{
                    background: '#ea7c00',
                    color: '#FFFFFF',
                    borderRadius: 50,
                    padding: '5px 18px',
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    boxShadow: '0 4px 12px rgba(234, 124, 0, 0.4)',
                    fontFamily: "'Ubuntu', sans-serif",
                  }}
                >
                  Featured
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--strive-heading)', marginBottom: 8 }}>
                  Color Graphics
                </h3>
                <div style={{ fontSize: 38, fontWeight: 800, color: '#ea7c00', marginBottom: 18 }}>
                  ₹5.00 <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--strive-muted)' }}>/ page</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', color: 'var(--strive-text)', fontSize: 14, lineHeight: 2.2 }}>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> Auto color page detection</li>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> Circuit diagrams &amp; graphs</li>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> Seminar presentation slides</li>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> High resolution color engine</li>
                </ul>
              </div>

              <Link href="/upload">
                <Button
                  className="btn-strive-primary"
                  style={{ width: '100%', height: 44 }}
                >
                  Print Color
                </Button>
              </Link>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="strive-pricing-card strive-pricing-anim">
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--strive-heading)', marginBottom: 8 }}>
                  Duplex Eco
                </h3>
                <div style={{ fontSize: 38, fontWeight: 800, color: '#10B981', marginBottom: 18 }}>
                  10% <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--strive-muted)' }}>discount</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', color: 'var(--strive-text)', fontSize: 14, lineHeight: 2.2 }}>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> KTU project report format</li>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> Paper saving double-sided</li>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> Applied automatically on checkout</li>
                  <li><CheckCircleFilled style={{ color: '#ea7c00', marginRight: 10 }} /> Eco-conscious campus initiative</li>
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
                    fontFamily: "'Ubuntu', sans-serif",
                    height: 44,
                  }}
                >
                  Choose Duplex
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </section>

      {/* BootstrapMade Strive Call To Action (CTA) Section */}
      <section className="strive-cta-banner">
        <h2 style={{ color: '#FFFFFF', fontSize: 34, fontWeight: 800, marginBottom: 14, fontFamily: "'Nunito', sans-serif" }}>
          Ready to Print Your Academic Documents?
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 16, maxWidth: 620, margin: '0 auto 32px', fontFamily: "'Roboto', sans-serif" }}>
          Submit your file online, track queue progress on your phone in real time, and collect your prints at Main Block Counter 1.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/upload">
            <Button
              className="btn-strive-primary"
              icon={<ArrowRightOutlined />}
              style={{ fontSize: 16, padding: '12px 38px', height: 'auto' }}
            >
              Upload Document Now
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              className="btn-strive-outline"
              icon={<ClockCircleOutlined />}
              style={{ fontSize: 16, padding: '12px 34px', height: 'auto' }}
            >
              Track Active Queue
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
