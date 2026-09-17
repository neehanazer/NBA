declare module 'next/server' {
  export class NextResponse {
    static json(body: any, init?: ResponseInit): Response;
    static redirect(url: string | URL, init?: number | ResponseInit): Response;
    static next(): Response;
  }
  export interface NextRequest extends Request {
    nextUrl: URL;
  }
}

declare module 'next/link' {
  import React from 'react';
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
  }
  const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
  export default Link;
}

declare module 'next/navigation' {
  export interface AppRouterInstance {
    back(): void;
    forward(): void;
    refresh(): void;
    push(href: string, options?: any): void;
    replace(href: string, options?: any): void;
    prefetch(href: string): void;
  }
  export function useRouter(): AppRouterInstance;
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
}
