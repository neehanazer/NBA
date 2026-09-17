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
                colorPrimary: '#1B3A5C', // Deep navy blue
                colorSuccess: '#52c41a',
                colorWarning: '#faad14',
                colorError: '#ff4d4f',
                colorInfo: '#1B3A5C',
                borderRadius: 8,
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
              },
              components: {
                Button: {
                  controlHeight: 40,
                  borderRadius: 8,
                  fontWeight: 600,
                },
                Table: {
                  headerBg: '#f4f7fb',
                  headerColor: '#1B3A5C',
                  rowHoverBg: '#f9fbfd',
                },
                Steps: {
                  colorPrimary: '#1B3A5C',
                },
                Card: {
                  borderRadiusLG: 12,
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
