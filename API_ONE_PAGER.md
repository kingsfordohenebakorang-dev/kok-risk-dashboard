# 🔌 KOK Risk API: Technical One-Pager

## Base URL
`https://api.kok-risk.com/v1`

## Authentication
All requests must include your Organization's **API Secret Key**:
`Authorization: Bearer sk_test_mock_...`

---

## 1. POST /evaluate
**Purpose:** Run a full credit assessment on a new borrower.

**Request:**
```json
{
  "borrower_id": "GHA-728192013-1",
  "phone": "054xxxxxxx",
  "amount_requested": 5000,
  "currency": "GHS",
  "data_source": "MOMO_STATEMENT_PDF" // or "BANK_STATEMENT"
}
```

**Response (Success - 200 OK):**
```json
{
  "status": "APPROVED",
  "risk_grade": "A",
  "probability_of_default": 2.5,
  "pricing": {
    "approved_amount": 5000,
    "interest_rate": "3.5% per month",
    "insurance_fee": 150.00
  },
  "flags": []
}
```

---

## 2. POST /collections/nudge
**Purpose:** Trigger an automated reminder via SMS/IVR to a borrower.

**Request:**
```json
{
  "loan_id": "LN-88210",
  "channel": "WHATSAPP", // or "SMS", "V_CALL"
  "tone": "URGENT" // or "FRIENDLY", "LEGAL"
}
```

---

## 3. GET /bureau/check/{gha_card}
**Purpose:** Instant check against XDS Data & Metropol Ghana.

**Response:**
```json
{
  "found": true,
  "total_debt": 12400.00,
  "worst_arrears_days": 0,
  "active_loans": 2
}
```

---

## Security Features
*   **Idempotency:** Supported via `Idempotency-Key` header.
*   **Rate Limits:** 100 requests / minute default.
*   **Whitelisting:** IP Restrictions available for Enterprise plans.
