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

      {/* Main Header */}
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '0 28px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          height: 72,
          boxShadow: '0 4px 20px -2px rgba(11, 37, 69, 0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {/* Official FISAT Logo & Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <img
              src="/fisat-official-logo.png"
              alt="FISAT Official Logo"
              style={{
                width: 48,
                height: 48,
                objectFit: 'contain',
                borderRadius: 10,
                background: '#FFFFFF',
                padding: 2,
                boxShadow: '0 4px 12px rgba(11, 37, 69, 0.12)',
                border: '1px solid #CBD5E1',
                flexShrink: 0,
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, lineHeight: 1.1 }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: '#0B2545', letterSpacing: -0.5 }}>
                  FISAT
                </span>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#134074' }}>
                  Print<span style={{ color: '#D4AF37' }}>Q</span>
                </span>
                <span className="fisat-gold-pill" style={{ marginLeft: 4 }}>
                  FCFS Hub
                </span>
              </div>
              <span style={{ fontSize: 10, color: '#64748B', fontWeight: 600, letterSpacing: 0.3, marginTop: 2 }}>
                CENTRAL PRINTING &amp; BINDING FACILITY
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            items={menuItems}
            style={{
              borderBottom: 'none',
              background: 'transparent',
              minWidth: 320,
              fontSize: 14,
              fontWeight: 600,
            }}
          />
        </div>

        {/* User / Session Area */}
        <Space size="middle">
          {status === 'authenticated' ? (
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
              <Space style={{ cursor: 'pointer', padding: '4px 12px', borderRadius: 8, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <Avatar
                  style={{ backgroundColor: '#0B2545', fontWeight: 700 }}
                  icon={<UserOutlined />}
                >
                  {session.user?.name?.[0]?.toUpperCase()}
                </Avatar>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <Text strong style={{ fontSize: 13, color: '#0B2545' }}>
                    {session.user?.name}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    {role === 'OPERATOR' ? 'Shop Operator' : 'Student / Faculty'}
                  </Text>
                </div>
              </Space>
            </Dropdown>
          ) : (
            <Space size="small">
              <Link href="/login">
                <Button type="default" icon={<LoginOutlined />} style={{ borderRadius: 8 }}>
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  type="primary"
                  style={{
                    background: '#0B2545',
                    borderColor: '#0B2545',
                    borderRadius: 8,
                    fontWeight: 700,
                  }}
                >
                  Register Campus ID
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

      {/* Collegiate Footer */}
      <Footer
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '32px 24px 20px',
          color: '#475569',
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
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img
                src="/fisat-official-logo.png"
                alt="FISAT Emblem"
                style={{
                  width: 38,
                  height: 38,
                  objectFit: 'contain',
                  borderRadius: 8,
                  background: '#FFFFFF',
                  padding: 2,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}
              />
              <div>
                <strong style={{ color: '#0B2545', fontSize: 15 }}>
                  FISAT Reprographic &amp; Central Print Center
                </strong>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  Federal Institute of Science And Technology (Autonomous), Hormis Nagar, Mookkannoor, Angamaly, Kerala
                </div>
              </div>
            </div>

            <Space size="large" style={{ fontSize: 13 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <EnvironmentOutlined style={{ color: '#134074' }} /> Ground Floor, Main Block
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ThunderboltOutlined style={{ color: '#D4AF37' }} /> Operating: Mon – Sat (8:30 AM – 5:30 PM)
              </span>
            </Space>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 16,
              fontSize: 12,
              color: '#94A3B8',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              &copy; {new Date().getFullYear()} FISAT PrintQ System. Designed for student lab manuals, assignments, seminars &amp; project reports.
            </div>
            <div>
              Automated First-Come, First-Served Queue • Ghostscript Color Analyzer • CUPS High-Speed Dispatch
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}
