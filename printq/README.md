# PrintQ — College Print Shop Automation

PrintQ is a full-stack, automated First-Come, First-Served (FCFS) print queue system designed for college campus print shops. It replaces manual WhatsApp file sharing and crowded pickup counters with an automated, transparent, and trackable queue.

---

## Architecture Overview

PrintQ uses a split architecture:

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│         VERCEL (Frontend)       │     │    SELF-HOSTED PRINT SERVER     │
│                                 │     │                                 │
│  Next.js 14+ (App Router)       │────▶│  Express.js Service (Port 4000) │
│  ├── Student Upload UI         │     │  ├── File conversion (headless) │
│  ├── Operator Dashboard        │     │  ├── PDF page & color analysis  │
│  ├── Auth (NextAuth credentials)│     │  ├── CUPS print queue commands  │
│  ├── API Routes (CRUD)         │     │  ├── Socket.io WebSocket server │
│  └── Payment (stubbed/dummy)   │     │  ├── uploads/ file storage      │
│                                 │◀────│  └── Auto-delete cleanup cron   │
│  Ant Design v5 UI              │     │                                 │
│  TanStack Query + Zustand      │     │                                 │
│  react-hook-form + zod         │     │                                 │
└─────────────────────────────────┘     └─────────────────────────────────┘
              │                                       │
              └──────────┬────────────────────────────┘
                         │
                  ┌──────▼──────┐
                  │   MongoDB   │
                  │  (Atlas or  │
                  │   Local)    │
                  └─────────────┘
```

---

## Features

- **Document Processing**: Accepts PDF, Word (DOCX), PowerPoint (PPTX), Excel (XLSX), and TXT documents.
- **Automated Color & Page Detection**: Analyzes document page counts and flags individual color pages.
- **Fair FCFS Queue**: Strict First-Come, First-Served queue ordering based on creation timestamp and verified payment.
- **Transparent Pricing Calculator**:
  - Default B&W: ₹2.00 / page
  - Default Color: ₹5.00 / page
  - Duplex Savings: 10% eco-discount on double-sided prints
  - Multi-copy multiplier
- **Real-Time Updates**: Live WebSocket updates via Socket.io for queue position and print status (`QUEUED` ➔ `PRINTING` ➔ `COMPLETED`).
- **Pluggable Payments**: Supports instant online simulation (cards, UPI) or counter payment.
- **Operator Command Center**: Live queue board with single-click "Send to Printer" and "Mark Done & Pickup" actions.
- **Privacy & Storage Cleanup**: Background cron automatically deletes completed print files after 24 hours.

---

## Directory Structure

```
NBA/
└── printq/
    ├── src/
    │   ├── app/
    │   │   ├── api/             # Next.js API Routes (auth, jobs, queue, pricing, stats)
    │   │   ├── dashboard/       # Student "My Jobs" tracking page
    │   │   ├── login/           # NextAuth sign-in page
    │   │   ├── register/        # Registration page
    │   │   ├── operator/        # Operator queue command center & tariff editor
    │   │   ├── upload/          # Multi-step upload wizard
    │   │   ├── layout.tsx       # Root Ant Design + Session providers layout
    │   │   └── page.tsx         # Modern landing page
    │   ├── components/
    │   │   ├── jobs/            # JobsTable, QueuePosition, StatusBadge
    │   │   ├── layout/          # AppLayout, Nav, Header, Footer
    │   │   ├── operator/        # QueueBoard, PricingEditor, DailySummary
    │   │   ├── payment/         # PaymentModal
    │   │   ├── providers/       # Theme ConfigProvider, QueryClientProvider
    │   │   └── upload/          # FileDropzone, PrintOptions, CostBreakdown, UploadWizard
    │   ├── hooks/               # useJobs, useQueue, usePricing, useSocket
    │   ├── lib/                 # prisma, auth, pricing, queue, payment, socket, api
    │   ├── stores/              # useUploadStore (Zustand)
    │   ├── types/               # TypeScript interfaces
    │   └── __tests__/           # Pricing & Queue unit tests
    ├── print-server/            # Self-hosted Express service (CUPS, LibreOffice, Socket.io)
    │   ├── routes/              # upload.ts, jobs.ts
    │   ├── services/            # analyzer.ts, converter.ts, printer.ts, cleanup.ts, notification.ts
    │   ├── interfaces/          # IPrinterService, IConverterService, INotificationService
    │   └── server.ts            # Entry point
    ├── prisma/
    │   └── schema.prisma        # MongoDB schema
    ├── .env.example
    └── package.json
```

---

## Quick Start Guide

### 1. Environment Setup
Copy `.env.example` to `.env`:
```bash
cd printq
cp .env.example .env
```

### 2. Frontend Development Server (Next.js)
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 3. Print Server (Express + Socket.io)
In a separate terminal:
```bash
cd print-server
npm install
npm run dev
```
Print server runs on [http://localhost:4000](http://localhost:4000).

### 4. Running Unit Tests
```bash
npm test
```
