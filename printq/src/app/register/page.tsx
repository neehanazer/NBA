'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography, Select, message, Row, Col } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  UserAddOutlined,
  PrinterOutlined,
  BankOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
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
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          phone: values.phone,
          role: values.role,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      message.success('Campus Account Registered! Logging in...');

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
    <div style={{ maxWidth: 520, margin: '32px auto' }}>
      <Card
        style={{
          borderRadius: 20,
          boxShadow: '0 10px 30px -5px rgba(11, 37, 69, 0.1)',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img
            src="/fisat-official-logo.png"
            alt="FISAT Official Logo"
            style={{
              width: 72,
              height: 72,
              objectFit: 'contain',
              borderRadius: 14,
              background: '#FFFFFF',
              padding: 4,
              marginBottom: 12,
              boxShadow: '0 8px 20px rgba(11, 37, 69, 0.12)',
              border: '2px solid #E2E8F0',
            }}
          />
          <div>
            <span className="fisat-gold-pill" style={{ marginBottom: 6 }}>
              <BankOutlined /> FISAT Central Reprographics
            </span>
          </div>
          <Title level={3} style={{ color: '#0B2545', margin: '4px 0 2px', fontWeight: 900 }}>
            Register Campus Print Account
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Eligible for FISAT students, faculty, and reprographic operators
          </Text>
        </div>

        <Form layout="vertical" onFinish={onFinish} requiredMark={false} initialValues={{ role: 'STUDENT', department: 'CSE' }}>
          <Form.Item
            name="name"
            label={<span style={{ fontWeight: 700, color: '#0B2545' }}>Full Name</span>}
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input prefix={<UserOutlined style={{ color: '#94A3B8' }} />} placeholder="e.g. Rahul Nair" size="large" style={{ borderRadius: 8 }} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={14}>
              <Form.Item
                name="email"
                label={<span style={{ fontWeight: 700, color: '#0B2545' }}>Campus Email</span>}
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Enter a valid email' },
                ]}
              >
                <Input prefix={<MailOutlined style={{ color: '#94A3B8' }} />} placeholder="name@fisat.ac.in" size="large" style={{ borderRadius: 8 }} />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name="department" label={<span style={{ fontWeight: 700, color: '#0B2545' }}>Branch / Dept</span>}>
                <Select size="large" style={{ borderRadius: 8 }}>
                  <Option value="CSE">CSE</Option>
                  <Option value="ECE">ECE</Option>
                  <Option value="EEE">EEE</Option>
                  <Option value="MECH">Mechanical</Option>
                  <Option value="CIVIL">Civil</Option>
                  <Option value="MCA">MCA</Option>
                  <Option value="MBA">MBA</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="phone"
            label={<span style={{ fontWeight: 700, color: '#0B2545' }}>Phone Number (WhatsApp Ready Alerts)</span>}
            help="Optional. We will send you an instant WhatsApp notification when prints are ready at Counter 1."
          >
            <Input prefix={<PhoneOutlined style={{ color: '#94A3B8' }} />} placeholder="+91 9876543210" size="large" style={{ borderRadius: 8 }} />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ fontWeight: 700, color: '#0B2545' }}>Choose Password</span>}
            rules={[
              { required: true, message: 'Please choose a password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password prefix={<LockOutlined style={{ color: '#94A3B8' }} />} placeholder="••••••••" size="large" style={{ borderRadius: 8 }} />
          </Form.Item>

          <Form.Item name="role" label={<span style={{ fontWeight: 700, color: '#0B2545' }}>Account Type</span>}>
            <Select size="large" style={{ borderRadius: 8 }}>
              <Option value="STUDENT">FISAT Student / Scholar (Submit &amp; Track)</Option>
              <Option value="OPERATOR">Reprographics Operator (Counter 1 Spooler Access)</Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<UserAddOutlined />}
            loading={loading}
            block
            size="large"
            style={{
              background: '#0B2545',
              borderColor: '#0B2545',
              borderRadius: 8,
              fontWeight: 800,
              height: 44,
              marginTop: 6,
              boxShadow: '0 4px 14px rgba(11, 37, 69, 0.25)',
            }}
          >
            Complete Registration &amp; Print
          </Button>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 24, fontSize: 13 }}>
          <Text type="secondary">Already registered? </Text>
          <Link href="/login" style={{ color: '#0B2545', fontWeight: 700 }}>
            Sign In with Campus ID
          </Link>
        </div>
      </Card>
    </div>
  );
}
