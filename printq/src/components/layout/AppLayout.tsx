'use client';

import React from 'react';
import { Layout, Menu, Button, Space, Typography, Tag, Dropdown, Avatar, Badge } from 'antd';
import {
  PrinterOutlined,
  CloudUploadOutlined,
  UnorderedListOutlined,
  DashboardOutlined,
  SettingOutlined,
  LineChartOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const role = (session?.user as any)?.role || 'STUDENT';
  const isOperator = role === 'OPERATOR' || role === 'ADMIN';

  const menuItems = [
    {
      key: '/upload',
      icon: <CloudUploadOutlined style={{ fontSize: 16 }} />,
      label: <Link href="/upload">Upload &amp; Print</Link>,
    },
    {
      key: '/dashboard',
      icon: <UnorderedListOutlined style={{ fontSize: 16 }} />,
      label: <Link href="/dashboard">My Print Jobs</Link>,
    },
    ...(isOperator
      ? [
          {
            key: '/operator',
            icon: <DashboardOutlined style={{ fontSize: 16 }} />,
            label: <Link href="/operator">Operator Queue</Link>,
          },
          {
            key: '/operator/pricing',
            icon: <SettingOutlined style={{ fontSize: 16 }} />,
            label: <Link href="/operator/pricing">Tariff Config</Link>,
          },
          {
            key: '/operator/stats',
            icon: <LineChartOutlined style={{ fontSize: 16 }} />,
            label: <Link href="/operator/stats">Analytics</Link>,
          },
        ]
      : []),
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <div style={{ padding: '6px 10px' }}>
          <div style={{ fontWeight: 700, color: '#0B2545', fontSize: 14 }}>
            {session?.user?.name || 'FISAT User'}
          </div>
          <div style={{ fontSize: 12, color: '#64748B' }}>{session?.user?.email}</div>
          <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
            <Tag color={isOperator ? 'gold' : 'blue'}>
              {role === 'OPERATOR' ? 'REPROGRAPHIC OPERATOR' : 'FISAT STUDENT'}
            </Tag>
          </div>
        </div>
      ),
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out of Campus ID',
      danger: true,
      onClick: () => signOut({ callbackUrl: '/login' }),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Official Collegiate Top Bar */}
      <div className="fisat-ticker-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontWeight: 800, color: '#D4AF37', letterSpacing: '0.5px' }}>
            FEDERAL INSTITUTE OF SCIENCE AND TECHNOLOGY (FISAT)
          </span>
          <span style={{ color: '#64748B', display: 'none' }} className="d-sm-inline">|</span>
          <span style={{ color: '#94A3B8', fontSize: 11 }}>
            Central Reprographic &amp; Document Service
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="fisat-tag-live">
            <div className="fisat-pulse-dot" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#E2E8F0' }}>
              Spooler Online • Counter 1 (Ground Floor)
            </span>
          </div>
          <Tag color="#134074" style={{ margin: 0, fontSize: 10, border: 'none' }}>
            AUTONOMOUS
          </Tag>
        </div>
      </div>

      {/* Arsha-Style Main Header */}
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#37517e',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          height: 72,
          boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {/* Official FISAT Logo & Brand (Arsha Style) */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img
              src="/fisat-official-logo.png"
              alt="FISAT Official Logo"
              style={{
                width: 44,
                height: 44,
                objectFit: 'contain',
                borderRadius: 10,
                background: '#FFFFFF',
                padding: 2,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                flexShrink: 0,
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, lineHeight: 1.1 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', fontFamily: "'Jost', sans-serif", letterSpacing: 1.5, textTransform: 'uppercase' }}>
                  FISAT <span style={{ color: '#47b2e4' }}>PRINTQ</span>
                </span>
              </div>
              <span style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500, letterSpacing: 0.5, marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>
                CENTRAL REPROGRAPHICS
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <Menu
            mode="horizontal"
            theme="dark"
            selectedKeys={[pathname]}
            items={menuItems}
            style={{
              borderBottom: 'none',
              background: 'transparent',
              minWidth: 320,
              fontSize: 15,
              fontWeight: 500,
              fontFamily: "'Poppins', sans-serif",
            }}
          />
        </div>

        {/* User / Session Area */}
        <Space size="middle">
          {status === 'authenticated' ? (
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
              <Space style={{ cursor: 'pointer', padding: '4px 14px', borderRadius: 50, background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <Avatar
                  style={{ backgroundColor: '#47b2e4', fontWeight: 700 }}
                  icon={<UserOutlined />}
                >
                  {session.user?.name?.[0]?.toUpperCase()}
                </Avatar>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <Text strong style={{ fontSize: 13, color: '#FFFFFF' }}>
                    {session.user?.name}
                  </Text>
                  <Text style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.7)' }}>
                    {role === 'OPERATOR' ? 'Shop Operator' : 'Student / Faculty'}
                  </Text>
                </div>
              </Space>
            </Dropdown>
          ) : (
            <Space size="middle">
              <Link href="/login">
                <Button
                  type="text"
                  icon={<LoginOutlined />}
                  style={{
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 15,
                  }}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/upload">
                <Button
                  className="btn-arsha-primary"
                  style={{
                    height: 40,
                    padding: '0 24px',
                    borderRadius: 50,
                    fontWeight: 600,
                    fontSize: 14,
                    background: '#47b2e4',
                    borderColor: '#47b2e4',
                    color: '#FFFFFF',
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Space>
          )}
        </Space>
      </Header>

      {/* Main Page Content */}
      <Content style={{ padding: '28px 24px', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        {children}
      </Content>

      {/* Arsha-Style Footer */}
      <Footer
        style={{
          background: '#37517e',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '40px 24px 28px',
          color: '#e2e8f0',
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 20,
              paddingBottom: 24,
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img
                src="/fisat-official-logo.png"
                alt="FISAT Emblem"
                style={{
                  width: 42,
                  height: 42,
                  objectFit: 'contain',
                  borderRadius: 8,
                  background: '#FFFFFF',
                  padding: 2,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}
              />
              <div>
                <strong style={{ color: '#FFFFFF', fontSize: 16, fontFamily: "'Jost', sans-serif", letterSpacing: 0.5 }}>
                  FISAT REPROGRAPHIC &amp; CENTRAL PRINT CENTER
                </strong>
                <div style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.7)', marginTop: 2 }}>
                  Federal Institute of Science And Technology (Autonomous), Hormis Nagar, Mookkannoor, Angamaly, Kerala
                </div>
              </div>
            </div>

            <Space size="large" style={{ fontSize: 13, color: '#e2e8f0' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <EnvironmentOutlined style={{ color: '#47b2e4' }} /> Ground Floor, Main Block
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ThunderboltOutlined style={{ color: '#47b2e4' }} /> Operating: Mon – Sat (8:30 AM – 5:30 PM)
              </span>
            </Space>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 20,
              fontSize: 13,
              color: 'rgba(255, 255, 255, 0.65)',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              &copy; {new Date().getFullYear()} <strong style={{ color: '#FFFFFF' }}>FISAT PrintQ</strong>. All Rights Reserved.
            </div>
            <div>
              Powered by <span style={{ color: '#47b2e4', fontWeight: 600 }}>Arsha UI Architecture</span> • Automated FCFS Print Spooler
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}
