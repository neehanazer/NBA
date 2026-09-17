'use client';

import React, { useEffect } from 'react';
import { Form, InputNumber, Input, Button, Card, Typography, message, Row, Col, Space } from 'antd';
import { SettingOutlined, SaveOutlined } from '@ant-design/icons';
import { usePricing } from '@/hooks/usePricing';

const { Title, Text } = Typography;

export default function PricingEditor() {
  const { pricing, isLoading, updatePricing, isUpdating } = usePricing();
  const [form] = Form.useForm();

  useEffect(() => {
    if (pricing) {
      form.setFieldsValue({
        ratePerPageBW: pricing.ratePerPageBW,
        ratePerPageColor: pricing.ratePerPageColor,
        duplexDiscount: (pricing.duplexDiscount * 100),
        currency: pricing.currency,
        currencySymbol: pricing.currencySymbol,
      });
    }
  }, [pricing, form]);

  const onFinish = async (values: any) => {
    try {
      await updatePricing({
        ratePerPageBW: Number(values.ratePerPageBW),
        ratePerPageColor: Number(values.ratePerPageColor),
        duplexDiscount: Number(values.duplexDiscount) / 100,
        currency: values.currency,
        currencySymbol: values.currencySymbol,
      });
      message.success('Print pricing configuration updated successfully!');
    } catch (err: any) {
      message.error(`Update failed: ${err.message}`);
    }
  };

  return (
    <Card
      title={
        <Space>
          <SettingOutlined style={{ color: '#1B3A5C' }} />
          <span>Shop Pricing &amp; Tariff Configuration</span>
        </Space>
      }
      style={{ borderRadius: 12, maxWidth: 650 }}
    >
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Rates defined here are automatically applied by the PDF analyzer and cost calculation engine.
      </Text>

      <Form form={form} layout="vertical" onFinish={onFinish} disabled={isLoading}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="ratePerPageBW"
              label="Black & White Rate (Per Page)"
              rules={[{ required: true, message: 'Please enter B&W rate' }]}
            >
              <InputNumber
                min={0.1}
                step={0.5}
                prefix={pricing?.currencySymbol || '₹'}
                style={{ width: '100%' }}
                size="large"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="ratePerPageColor"
              label="Color Ink Rate (Per Page)"
              rules={[{ required: true, message: 'Please enter Color rate' }]}
            >
              <InputNumber
                min={0.5}
                step={0.5}
                prefix={pricing?.currencySymbol || '₹'}
                style={{ width: '100%' }}
                size="large"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="duplexDiscount"
              label="Duplex (Double-Sided) Discount %"
              rules={[{ required: true, message: 'Please enter discount %' }]}
              help="e.g. 10 for 10% discount on print job"
            >
              <InputNumber
                min={0}
                max={50}
                suffix="%"
                style={{ width: '100%' }}
                size="large"
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="currency" label="Currency Code">
              <Input size="large" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item name="currencySymbol" label="Symbol">
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Button
          type="primary"
          htmlType="submit"
          icon={<SaveOutlined />}
          loading={isUpdating}
          size="large"
          style={{ background: '#1B3A5C', marginTop: 8 }}
        >
          Save Changes
        </Button>
      </Form>
    </Card>
  );
}
