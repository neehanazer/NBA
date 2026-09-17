'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Space, message, Divider, Alert, Tag } from 'antd';
import { MailOutlined, LockOutlined, LoginOutlined, PrinterOutlined } from '@ant-design/icons';
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
        message.success('Welcome back to PrintQ!');
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
        email: 'student@college.edu',
        password: 'password123',
      });
    } else {
      form.setFieldsValue({
        email: 'operator@college.edu',
        password: 'password123',
      });
    }
  };

  return (
    <div style={{ maxWidth: 440, margin: '40px auto' }}>
      <Card
        style={{
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #1B3A5C 0%, #2A5C8F 100%)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 26,
              marginBottom: 12,
            }}
          >
            <PrinterOutlined />
          </div>
          <Title level={3} style={{ color: '#1B3A5C', margin: 0 }}>
            Sign In to PrintQ
          </Title>
          <Text type="secondary">Enter your college credentials</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="email"
            label="College Email Address"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="student@college.edu" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
            loading={loading}
            block
            size="large"
            style={{ background: '#1B3A5C', marginTop: 8 }}
          >
            Sign In
          </Button>
        </Form>

        <Divider style={{ margin: '20px 0 12px' }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Demo Quick Login
          </Text>
        </Divider>

        <Space style={{ width: '100%', justifyContent: 'center' }}>
          <Button size="small" onClick={() => fillDemo('student')}>
            Demo Student
          </Button>
          <Button size="small" onClick={() => fillDemo('operator')}>
            Demo Operator
          </Button>
        </Space>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Text type="secondary">Don't have an account? </Text>
          <Link href="/register" style={{ color: '#1B3A5C', fontWeight: 600 }}>
            Register here
          </Link>
        </div>
      </Card>
    </div>
  );
}
