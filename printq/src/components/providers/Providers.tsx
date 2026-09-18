'use client';

import React, { useState } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              algorithm: antdTheme.defaultAlgorithm,
              token: {
                colorPrimary: '#ea7c00', // Strive Signature Orange
                colorInfo: '#282828', // Strive Charcoal
                colorSuccess: '#10B981', // Success Emerald
                colorWarning: '#ea7c00', // Strive Accent
                colorError: '#EF4444',
                colorTextBase: '#444444',
                colorBgBase: '#FFFFFF',
                borderRadius: 8,
                borderRadiusLG: 14,
                borderRadiusSM: 6,
                fontFamily:
                  "'Roboto', 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              },
              components: {
                Button: {
                  controlHeight: 42,
                  borderRadius: 8,
                  fontWeight: 600,
                  primaryColor: '#FFFFFF',
                  primaryShadow: '0 4px 15px 0 rgba(234, 124, 0, 0.35)',
                },
                Table: {
                  headerBg: '#F8FAFC',
                  headerColor: '#282828',
                  rowHoverBg: '#F5F2EF',
                  borderColor: '#E8E3DF',
                },
                Steps: {
                  colorPrimary: '#ea7c00',
                  iconSize: 36,
                },
                Card: {
                  borderRadiusLG: 14,
                  headerFontSize: 16,
                  colorBorderSecondary: '#E8E3DF',
                },
                Tabs: {
                  itemSelectedColor: '#ea7c00',
                  inkBarColor: '#ea7c00',
                  itemHoverColor: '#ea7c00',
                },
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </SessionProvider>
  );
}
