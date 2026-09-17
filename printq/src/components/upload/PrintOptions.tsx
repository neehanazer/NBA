'use client';

import React from 'react';
import { Card, Form, Switch, InputNumber, Space, Typography, Tag, Divider, Row, Col, Select } from 'antd';
import {
  CopyOutlined,
  FileTextOutlined,
  CheckCircleFilled,
  EnvironmentOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useUploadStore } from '@/stores/uploadStore';

const { Text, Title } = Typography;
const { Option } = Select;

export default function PrintOptions() {
  const {
    originalName,
    pageCount,
    colorPages,
    bwPages,
    duplex,
    copies,
    setOptions,
  } = useUploadStore();

  return (
    <Card style={{ borderRadius: 16, border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <Title level={4} style={{ color: '#0B2545', margin: 0 }}>
            Configure Print &amp; Binding Options
          </Title>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Review scanned page types and choose your document output specifications.
          </Text>
        </div>
        <Tag color="blue" style={{ fontWeight: 700 }}>
          Scanned Document
        </Tag>
      </div>

      {/* Detected Document Metadata Card */}
      <div
        style={{
          background: '#F8FAFC',
          padding: '16px 20px',
          borderRadius: 12,
          border: '1px solid #E2E8F0',
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Space>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#0B2545',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileTextOutlined />
            </div>
            <Text strong style={{ fontSize: 15, color: '#0B2545' }}>{originalName}</Text>
          </Space>
          <Tag color="cyan">Automated Ink Analysis</Tag>
        </div>

        <Row gutter={[16, 12]}>
          <Col xs={8}>
            <Text type="secondary" style={{ fontSize: 12 }}>Total Pages</Text>
            <div><Text strong style={{ fontSize: 18, color: '#0B2545' }}>{pageCount}</Text></div>
          </Col>
          <Col xs={8}>
            <Text type="secondary" style={{ fontSize: 12 }}>Black &amp; White Text</Text>
            <div>
              <Tag color="default" style={{ fontSize: 13, padding: '2px 8px' }}>{bwPages} pages</Tag>
            </div>
          </Col>
          <Col xs={8}>
            <Text type="secondary" style={{ fontSize: 12 }}>Color Elements</Text>
            <div>
              {colorPages.length > 0 ? (
                <Tag color="volcano" style={{ fontSize: 13, padding: '2px 8px' }}>
                  {colorPages.length} Color (p. {colorPages.join(', ')})
                </Tag>
              ) : (
                <Tag color="green" style={{ fontSize: 13, padding: '2px 8px' }}>None (All B&amp;W)</Tag>
              )}
            </div>
          </Col>
        </Row>
      </div>

      <Form layout="vertical">
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <CopyOutlined style={{ color: '#0B2545' }} />
                  <span style={{ fontWeight: 700 }}>Number of Copies (Sets)</span>
                </Space>
              }
              help="Enter number of sets required (e.g., student + guide copy)"
            >
              <InputNumber
                min={1}
                max={50}
                value={copies}
                onChange={(val) => setOptions({ copies: Number(val) || 1 })}
                style={{ width: '100%', borderRadius: 8 }}
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={<span style={{ fontWeight: 700 }}>Double-Sided Printing (Duplex)</span>}
              help={
                pageCount > 1
                  ? 'Recommended for seminar and project documentation. Includes 10% eco discount.'
                  : 'Single page document — duplex does not apply.'
              }
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: duplex ? '#ECFDF5' : '#F8FAFC',
                  border: duplex ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                  marginTop: 4,
                }}
              >
                <Switch
                  checked={duplex}
                  disabled={pageCount <= 1}
                  onChange={(checked) => setOptions({ duplex: checked })}
                />
                <Text strong style={{ color: duplex ? '#065F46' : '#64748B' }}>
                  {duplex ? 'Duplex Enabled (Two-Sided)' : 'Single-Sided Standard'}
                </Text>
                {duplex && (
                  <Tag color="success" icon={<CheckCircleFilled />} style={{ marginLeft: 'auto' }}>
                    10% Off Applied
                  </Tag>
                )}
              </div>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label={
                <Space>
                  <EnvironmentOutlined style={{ color: '#0B2545' }} />
                  <span style={{ fontWeight: 700 }}>FISAT Campus Pickup Counter</span>
                </Space>
              }
            >
              <Select defaultValue="counter1" size="large" style={{ borderRadius: 8 }}>
                <Option value="counter1">
                  Counter 1 — Main Block Central Reprographics (Ground Floor) • Fast Queue
                </Option>
                <Option value="counter2">
                  Counter 2 — Central Library Digital Print Corner (1st Floor)
                </Option>
                <Option value="counter3">
                  Counter 3 — Lab Block Mechanical/Electrical Print Hub
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
