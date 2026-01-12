# Bank-Grade Risk & Insurance Infrastructure (Unicorn Edition)

A production-ready, multi-tenant API for **Credit Risk Assessment**, **Parametric Insurance**, and **Automated Claims**. Built for the African market with provisions for cross-border operability and blockchain transparency.

## 🚀 Key Features

### 1. Unified Risk Engine
- **Probability of Default (PD)** & **Loss Given Default (LGD)** modeling.
- **Multi-Currency Pricing**: Automatically adjusts premiums for **GHS**, **NGN**, **KES**, and **USD** based on real-time volatility buffers.
- **Shadow Mode**: Runs challenger models (v1.1) in the background to safely test new algorithms.

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
- **Gig Economy**: Analyzes stability of Uber/Bolt payouts.

---

## 🛠 Tech Stack

*   **Runtime**: Node.js (TypeScript)
*   **Database**: PostgreSQL 15 (via Prisma ORM)
*   **Cache**: Redis 7 (Feature Store)
*   **Infrastructure**: Docker & Docker Compose
*   **Security**: Helmet, CORS, Rate-Limiting, JWT Auth

---

## 🔌 API Reference

### Authentication
All endpoints require a JSON Web Token (JWT) or API Key.
- `POST /v1/auth/register`: Create a new Bank/Fintech account.
- `POST /v1/auth/login`: Get a Bearer Token.

### Core Risk
- `POST /v1/evaluate`: Calculate Risk Score & Insurance Premium.
  - *Inputs*: `borrower_id`, `amount`, `currency`, `tenor`.
- `POST /v1/ingest`: Upload raw transaction logs (Telco/Bank statements).
- `GET /v1/explain`: XAI (Explainable AI) reason codes for decisions.

### Parametric & Webhooks
- `POST /v1/webhooks/repayment`: Push "Missed Payment" events here.
  - *Trigger*: `days_past_due > 30` -> Initiates Blockchain Payout.

### Compliance
- `GET /v1/compliance/report`: Download audit logs for Regulators.
  - *Query Config*: `regulator=DPC_GHANA&start_date=...`

---

## 📦 Setup & Deployment

### Prerequisites
*   Docker & Docker Compose

### Fast Start
1.  **Clone & Run**:
    ```bash
    docker-compose up --build -d
    ```
2.  **Initialize Database**:
    ```bash
    npx prisma migrate deploy
    ```
3.  **Access Dashboard**:
    Open `http://localhost:3000/login.html`

### Development
1.  **Install Dependencies**: `npm install`
2.  **Run Locally**: `npm run dev`
3.  **Test Verification**: `./verify-system.sh`

---

## 🔒 Security Notes
*   **PII Protection**: All personal identifiers are masked in logs.
*   **Ledger Integrity**: Audit logs are write-only.
*   **Environment**: Secrets managed via `.env` (ensure `JWT_SECRET` is set in prod).

---

## ☁️ Cloud Deployment

**[👉 Read the Step-by-Step Deployment & Domain Guide](./DEPLOYMENT_GUIDE.md)**

<a href="https://render.com/deploy?repo=https://github.com/kingsfordohenebakorang-dev/kok-risk" target="_blank">
  <img src="https://render.com/images/deploy-to-render-button.svg" alt="Deploy to Render" />
</a>

1. Click the button above.
2. Grant Render access to your GitHub account if prompted.
3. Click **"Apply Blueprint"** to auto-create Database, Redis, and API.

---ha
# kok-risk
