'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Space, message, Divider, Alert, Tag } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined, PrinterOutlined, BankOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        message.error(res.error);
      } else {
        message.success('Welcome to FISAT PrintQ Portal!');
        router.push('/upload');
        router.refresh();
      }
    } catch (err: any) {
      message.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role: 'student' | 'operator') => {
    if (role === 'student') {
      form.setFieldsValue({
        email: 'student@fisat.ac.in',
        password: 'password123',
      });
    } else {
      form.setFieldsValue({
        email: 'operator@fisat.ac.in',
        password: 'password123',
      });
    }
  };

  return (
    <div style={{ maxWidth: 460, margin: '32px auto' }}>
      <Card
        style={{
          borderRadius: 20,
          boxShadow: '0 10px 30px -5px rgba(11, 37, 69, 0.1)',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 58,
              height: 58,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #0B2545 0%, #134074 100%)',
              border: '2px solid #D4AF37',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F3C68F',
              fontSize: 28,
              marginBottom: 14,
              boxShadow: '0 8px 16px rgba(11, 37, 69, 0.2)',
            }}
          >
            <PrinterOutlined />
          </div>
          <div>
            <span className="fisat-gold-pill" style={{ marginBottom: 8 }}>
              <BankOutlined /> FISAT Autonomous
            </span>
          </div>
          <Title level={3} style={{ color: '#0B2545', margin: '6px 0 2px', fontWeight: 900 }}>
            FISAT PrintQ Portal
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Central Reprographics &amp; Document Service Login
          </Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="email"
            label={<span style={{ fontWeight: 700, color: '#0B2545' }}>Campus / Roll Number Email</span>}
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined style={{ color: '#94A3B8' }} />} placeholder="student@fisat.ac.in" size="large" style={{ borderRadius: 8 }} />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ fontWeight: 700, color: '#0B2545' }}>Password</span>}
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#94A3B8' }} />} placeholder="••••••••" size="large" style={{ borderRadius: 8 }} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
            loading={loading}
            block
            size="large"
            style={{
              background: '#0B2545',
              borderColor: '#0B2545',
              borderRadius: 8,
              fontWeight: 800,
              height: 44,
              marginTop: 4,
              boxShadow: '0 4px 14px rgba(11, 37, 69, 0.25)',
            }}
          >
            Authenticate &amp; Access Queue
          </Button>
        </Form>

        <Divider style={{ margin: '24px 0 16px' }}>
          <Text type="secondary" style={{ fontSize: 12, fontWeight: 600 }}>
            Demo Test Credentials
          </Text>
        </Divider>

        <Space style={{ width: '100%', justifyContent: 'center' }}>
          <Button size="middle" onClick={() => fillDemo('student')} style={{ borderRadius: 6 }}>
            Demo Student
          </Button>
          <Button size="middle" onClick={() => fillDemo('operator')} style={{ borderRadius: 6 }}>
            Demo Operator
          </Button>
        </Space>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13 }}>
          <Text type="secondary">New student or faculty? </Text>
          <Link href="/register" style={{ color: '#0B2545', fontWeight: 700 }}>
            Register Campus Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
