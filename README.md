# NBA — PrintQ College Print Shop Automation

PrintQ is an automated First-Come, First-Served (FCFS) college print shop queue system replacing manual WhatsApp workflows with an automated, trackable queue.

---

## Quick Start

### 1. Frontend (Next.js 16 + Ant Design v5)
```bash
cd printq
npm install --legacy-peer-deps
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 2. Print Server (Express + Socket.io + CUPS mock)
```bash
cd printq/print-server
npm install --legacy-peer-deps
npm run dev
```
Runs on [http://localhost:4000](http://localhost:4000).

### 3. Run Tests
```bash
cd printq
npm test
```

See [printq/README.md](printq/README.md) for full architecture details, environment variables, and API reference.
