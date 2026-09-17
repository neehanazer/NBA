'use client';

import React from 'react';
import { Card, Form, Switch, InputNumber, Space, Typography, Tag, Divider, Row, Col } from 'antd';
import { CopyOutlined, FileTextOutlined, CheckCircleFilled } from '@ant-design/icons';
import { useUploadStore } from '@/stores/uploadStore';

const { Text, Title } = Typography;

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
    <Card style={{ borderRadius: 12 }}>
      <Title level={4} style={{ marginBottom: 16 }}>
        Configure Print Options
      </Title>

      {/* Detected Document Metadata */}
      <div
        style={{
          background: '#f8fafc',
          padding: '16px',
          borderRadius: 8,
          border: '1px solid #e2e8f0',
          marginBottom: 24,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Space>
              <FileTextOutlined style={{ color: '#1B3A5C', fontSize: 18 }} />
              <Text strong>{originalName}</Text>
            </Space>
            <Tag color="cyan">Automated Scan</Tag>
          </div>

          <Divider style={{ margin: '8px 0' }} />

          <Row gutter={16}>
            <Col span={8}>
              <Text type="secondary" style={{ fontSize: 12 }}>Total Pages</Text>
              <div><Text strong style={{ fontSize: 16 }}>{pageCount}</Text></div>
            </Col>
            <Col span={8}>
              <Text type="secondary" style={{ fontSize: 12 }}>Black &amp; White</Text>
              <div>
                <Tag color="default">{bwPages} pages</Tag>
              </div>
            </Col>
            <Col span={8}>
              <Text type="secondary" style={{ fontSize: 12 }}>Color Detected</Text>
              <div>
                {colorPages.length > 0 ? (
                  <Tag color="volcano">{colorPages.length} color (p. {colorPages.join(', ')})</Tag>
                ) : (
                  <Tag color="green">None (All B&amp;W)</Tag>
                )}
              </div>
            </Col>
          </Row>
        </Space>
      </div>

      <Form layout="vertical">
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <CopyOutlined />
                  <span>Number of Copies</span>
                </Space>
              }
              help="How many sets would you like to print?"
            >
              <InputNumber
                min={1}
                max={50}
                value={copies}
                onChange={(val) => setOptions({ copies: Number(val) || 1 })}
                style={{ width: '100%' }}
                size="large"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Print Double-Sided (Duplex)"
              help={
                pageCount > 1
                  ? 'Saves paper! Includes automatic 10% discount on print cost.'
                  : 'Single page document — duplex does not apply.'
              }
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                <Switch
                  checked={duplex}
                  disabled={pageCount <= 1}
                  onChange={(checked) => setOptions({ duplex: checked })}
                />
                <Text>{duplex ? 'Yes (Two-sided)' : 'No (Single-sided)'}</Text>
                {duplex && (
                  <Tag color="success" icon={<CheckCircleFilled />}>
                    10% Off
                  </Tag>
                )}
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
