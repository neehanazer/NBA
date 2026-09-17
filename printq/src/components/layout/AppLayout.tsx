'use client';

import React from 'react';
import { Layout, Menu, Button, Space, Typography, Tag, Dropdown, Avatar } from 'antd';
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
      icon: <CloudUploadOutlined />,
      label: <Link href="/upload">Upload & Print</Link>,
    },
    {
      key: '/dashboard',
      icon: <UnorderedListOutlined />,
      label: <Link href="/dashboard">My Jobs</Link>,
    },
    ...(isOperator
      ? [
          {
            key: '/operator',
            icon: <DashboardOutlined />,
            label: <Link href="/operator">Operator Queue</Link>,
          },
          {
            key: '/operator/pricing',
            icon: <SettingOutlined />,
            label: <Link href="/operator/pricing">Pricing</Link>,
          },
          {
            key: '/operator/stats',
            icon: <LineChartOutlined />,
            label: <Link href="/operator/stats">Analytics</Link>,
          },
        ]
      : []),
  ];

  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <div style={{ padding: '4px 8px' }}>
          <div style={{ fontWeight: 600 }}>{session?.user?.name || 'User'}</div>
          <div style={{ fontSize: 12, color: '#8c8c8c' }}>{session?.user?.email}</div>
          <Tag color={isOperator ? 'gold' : 'blue'} style={{ marginTop: 4 }}>
            {role}
          </Tag>
        </div>
      ),
    },
    { type: 'divider' as const },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      danger: true,
      onClick: () => signOut({ callbackUrl: '/login' }),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '0 24px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          height: 64,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #1B3A5C 0%, #2A5C8F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 20,
                boxShadow: '0 2px 8px rgba(27, 58, 92, 0.25)',
              }}
            >
              <PrinterOutlined />
            </div>
            <div>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#1B3A5C', letterSpacing: -0.5 }}>
                Print<span style={{ color: '#fa8c16' }}>Q</span>
              </span>
              <span
                style={{
                  fontSize: 10,
                  marginLeft: 6,
                  padding: '1px 6px',
                  borderRadius: 4,
                  background: '#f0f5ff',
                  color: '#1d39c4',
                  fontWeight: 600,
                }}
              >
                FCFS
              </span>
            </div>
          </Link>

          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            items={menuItems}
            style={{ borderBottom: 'none', background: 'transparent', minWidth: 320 }}
          />
        </div>

        <Space size="middle">
          {status === 'authenticated' ? (
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  style={{ backgroundColor: '#1B3A5C' }}
                  icon={<UserOutlined />}
                >
                  {session.user?.name?.[0]?.toUpperCase()}
                </Avatar>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                  <Text strong style={{ fontSize: 13 }}>
                    {session.user?.name}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11 }}>
                    {role}
                  </Text>
                </div>
              </Space>
            </Dropdown>
          ) : (
            <Space>
              <Link href="/login">
                <Button type="default" icon={<LoginOutlined />}>
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button type="primary">Register</Button>
              </Link>
            </Space>
          )}
        </Space>
      </Header>

      <Content style={{ padding: '24px', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
        {children}
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          color: '#8c8c8c',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          padding: '16px 24px',
        }}
      >
        <Space direction="vertical" size={2}>
          <div>
            <strong>PrintQ</strong> — Automated College Print Shop &amp; FCFS Queue System
          </div>
          <div style={{ fontSize: 12 }}>
            Transparent per-page pricing • Live queue tracking • Automated duplex &amp; color detection
          </div>
        </Space>
      </Footer>
    </Layout>
  );
}
