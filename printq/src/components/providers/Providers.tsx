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
                colorPrimary: '#0B2545', // FISAT Deep Navy
                colorInfo: '#134074', // FISAT Blue
                colorSuccess: '#10B981', // Emerald Success
                colorWarning: '#D97706', // Warm Amber
                colorError: '#EF4444',
                colorTextBase: '#0F172A',
                colorBgBase: '#FFFFFF',
                borderRadius: 10,
                borderRadiusLG: 14,
                borderRadiusSM: 6,
                fontFamily:
                  "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              },
              components: {
                Button: {
                  controlHeight: 42,
                  borderRadius: 8,
                  fontWeight: 600,
                  primaryColor: '#FFFFFF',
                  primaryShadow: '0 4px 14px 0 rgba(11, 37, 69, 0.25)',
                },
                Table: {
                  headerBg: '#F8FAFC',
                  headerColor: '#0B2545',
                  rowHoverBg: '#F1F5F9',
                  borderColor: '#E2E8F0',
                },
                Steps: {
                  colorPrimary: '#0B2545',
                  iconSize: 36,
                },
                Card: {
                  borderRadiusLG: 14,
                  headerFontSize: 16,
                  colorBorderSecondary: '#E2E8F0',
                },
                Tabs: {
                  itemSelectedColor: '#0B2545',
                  inkBarColor: '#D4AF37',
                  itemHoverColor: '#134074',
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
