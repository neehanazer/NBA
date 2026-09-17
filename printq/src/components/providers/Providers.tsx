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
                colorPrimary: '#47b2e4', // Arsha Sky Blue Accent
                colorInfo: '#37517e', // Arsha Deep Indigo Heading
                colorSuccess: '#10B981', // Success Emerald
                colorWarning: '#D97706', // Amber Warning
                colorError: '#EF4444',
                colorTextBase: '#444444',
                colorBgBase: '#FFFFFF',
                borderRadius: 8,
                borderRadiusLG: 14,
                borderRadiusSM: 6,
                fontFamily:
                  "'Open Sans', 'Jost', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              },
              components: {
                Button: {
                  controlHeight: 42,
                  borderRadius: 8,
                  fontWeight: 600,
                  primaryColor: '#FFFFFF',
                  primaryShadow: '0 4px 15px 0 rgba(71, 178, 228, 0.35)',
                },
                Table: {
                  headerBg: '#F8FAFC',
                  headerColor: '#37517e',
                  rowHoverBg: '#F1F5F9',
                  borderColor: '#E2E8F0',
                },
                Steps: {
                  colorPrimary: '#47b2e4',
                  iconSize: 36,
                },
                Card: {
                  borderRadiusLG: 14,
                  headerFontSize: 16,
                  colorBorderSecondary: '#E2E8F0',
                },
                Tabs: {
                  itemSelectedColor: '#37517e',
                  inkBarColor: '#47b2e4',
                  itemHoverColor: '#47b2e4',
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
