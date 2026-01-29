# 🦄 Bank-Grade Risk & Insurance Infrastructure

[![Deploy to Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=kok-risk-dashboard)](https://kok-risk-dashboard.vercel.app)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)

A production-ready, multi-tenant API for **Credit Risk Assessment**, **Parametric Insurance**, and **Automated Claims**. Built for the African market with provisions for cross-border operability and blockchain transparency.

---

## 🚀 Key Features

### 1. Unified Risk Engine
- **Probability of Default (PD)** & **Loss Given Default (LGD)** modeling.
- **Multi-Currency Pricing**: Automatically adjusts premiums for **GHS**, **NGN**, **KES**, and **USD** based on real-time volatility buffers.
- **Sector-Specific Underwriting**: Specialized models for:
  - 🏛️ **Government Workers** (CAGD Payroll backing) - *Low Risk*
  - 💼 **Salaried Corporate** - *Low/Medium Risk*
  - 🛒 **SME Owners** - *Variable Risk*
  - 🛵 **Gig Economy** (Uber/Bolt) - *Velocity-based Risk*
  - 🛖 **Informal Traders** - *High Risk*

### 2. Parametric "Instant Payout" Engine
- **Automated Claims**: Monitors repayment webhooks. If `days_past_due > 30`, it triggers an instant payout.
- **Blockchain Integration**: Connects to Smart Contracts (Ethereum/Polygon/Chainlink) to execute and log payouts immutably.
- **Zero-Manual Intervention**: Eliminates the need for claims adjusters.

### 3. Compliance & Governance
- **Regulatory-as-a-Service**: One-click audit reports for **Data Protection Commission (Ghana)** and **NDPC (Nigeria)**.
- **Immutable Audit Vault**: Every decision is cryptographically logged to PostgreSQL.
- **Role-Based Access**: Specialized dashboards for **Banks** (Underwriting view) vs **Fintechs** (Origination view).

### 4. Alternative Data Aggregator
- **Telco Integration**: Ingests Airtime & Mobile Money velocity.
- **Features**: Analyzes zero-balance days, betting frequency, and wallet age.

---

## 🛠 Tech Stack

*   **Runtime**: Node.js (TypeScript)
*   **Database**: PostgreSQL 15 (via Prisma ORM)
*   **Cache**: Redis 7 (Feature Store)
*   **Infrastructure**: Docker & Docker Compose / Vercel Serverless
*   **Security**: Helmet, CORS, Rate-Limiting, JWT Auth

---

## 🔌 API Reference

### Authentication
All endpoints require a JSON Web Token (JWT) or API Key.
*   `POST /api/v1/auth/register`: Create a new Bank/Fintech account.
*   `POST /api/v1/auth/login`: Get a Bearer Token.

### Core Risk
*   `POST /api/v1/evaluate`: Calculate Risk Score & Insurance Premium.
    *   *Inputs*: `borrower_id`, `amount`, `currency`, `tenor`, `employment_type`.
*   `POST /api/v1/ingest`: Upload raw transaction logs (Telco/Bank statements).
*   `GET /api/v1/explain`: XAI (Explainable AI) reason codes for decisions.

### Parametric & Webhooks
*   `POST /api/v1/webhooks/repayment`: Push "Missed Payment" events here.
    *   *Trigger*: `days_past_due > 30` -> Initiates Blockchain Payout.

### Compliance
*   `GET /api/v1/compliance/report`: Download audit logs for Regulators.
    *   *Query Config*: `regulator=DPC_GHANA&start_date=...`

---

## 📦 Setup & Deployment

### Cloud Deployment (Recommended)
This project is optimized for **Vercel** (Frontend + API) and **Render** (Database/Background Services).

**[👉 Read the Step-by-Step Deployment & Domain Guide](./DEPLOYMENT_GUIDE.md)**

### Local Development

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/kingsfordohenebakorang-dev/kok-risk-dashboard.git
    cd kok-risk-dashboard
    npm install
    ```

2.  **Environment Setup**:
    ```bash
    cp .env.example .env
    # Configure DATABASE_URL and JWT_SECRET
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Access the dashboard at `http://localhost:3000`.

4.  **Run with Docker**:
    ```bash
    docker-compose up --build
    ```

---

## 🔒 Security Notes
*   **PII Protection**: All personal identifiers are masked in logs.
*   **Ledger Integrity**: Audit logs are write-only.
*   **Environment**: Secrets managed via `.env` (ensure `JWT_SECRET` is set in prod).

---

## � License
This project is licensed under the ISC License.
