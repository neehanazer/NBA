'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Select, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined, UserAddOutlined, PrinterOutlined } from '@ant-design/icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title, Text } = Typography;
const { Option } = Select;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      message.success('Account created! Logging you in...');

      // Auto login
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      router.push('/upload');
      router.refresh();
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '40px auto' }}>
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
            Create PrintQ Account
          </Title>
          <Text type="secondary">Join the automated queue system</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} requiredMark={false} initialValues={{ role: 'STUDENT' }}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Alex Kumar" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="College Email Address"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="alex@college.edu" size="large" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number (for WhatsApp Pickup Alerts)"
            help="Optional. Receive live WhatsApp message when your prints are ready."
          >
            <Input prefix={<PhoneOutlined />} placeholder="+91 9876543210" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please choose a password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" size="large" />
          </Form.Item>

          <Form.Item name="role" label="Account Role">
            <Select size="large">
              <Option value="STUDENT">Student (Standard User)</Option>
              <Option value="OPERATOR">Print Shop Operator</Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<UserAddOutlined />}
            loading={loading}
            block
            size="large"
            style={{ background: '#1B3A5C', marginTop: 8 }}
          >
            Create Account &amp; Continue
          </Button>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Text type="secondary">Already have an account? </Text>
          <Link href="/login" style={{ color: '#1B3A5C', fontWeight: 600 }}>
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}
