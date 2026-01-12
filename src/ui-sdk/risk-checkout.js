/**
 * Embedded Risk Checkout SDK (v1.0)
 * Allows partners to embed a "Qualify for Loan" widget in their checkout.
 */

(function (window) {
    class RiskCheckout {
        constructor(config) {
            this.apiKey = config.apiKey;
            this.endpoint = config.endpoint || '/v1/evaluate';
            this.containerId = config.containerId;
        }

        async render(amount, currency = 'GHS') {
            const container = document.getElementById(this.containerId);
            if (!container) return console.error('RiskCheckout: Container not found');

            container.innerHTML = `<div style="padding:10px; border:1px solid #ccc; border-radius:4px;">Checking eligibility...</div>`;

            // Simulate borrower ID (in real life, passed via secure session)
            const borrowerId = 'user_' + Math.floor(Math.random() * 10000);

            try {
                const response = await fetch(this.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': this.apiKey
                    },
                    body: JSON.stringify({
                        borrower_id: borrowerId,
                        loan_amount: amount,
                        tenor: 1, // Default 1 month
                        currency: currency
                    })
                });

                const data = await response.json();

                if (data.approved) {
                    container.innerHTML = `
              <div style="padding:15px; border:1px solid #22c55e; background:#f0fdf4; border-radius:6px; font-family:sans-serif;">
                <h4 style="margin:0 0 5px; color:#166534">✅ Pre-Approved</h4>
                <p style="margin:0; font-size:14px; color:#15803d">
                   Pay <b>${data.pricing.premium} ${currency}</b> insurance to secure this loan.
                </p>
                <button style="margin-top:10px; background:#166534; color:white; border:none; padding:8px 12px; border-radius:4px; cursor:pointer;">
                  Proceed with Loan
                </button>
              </div>
            `;
                } else {
                    container.innerHTML = `
              <div style="padding:15px; border:1px solid #ef4444; background:#fef2f2; border-radius:6px; font-family:sans-serif;">
                <h4 style="margin:0 0 5px; color:#991b1b">Use Card / Mobile Money</h4>
                <p style="margin:0; font-size:14px; color:#7f1d1d">
                   Loan option unavailable based on risk profile.
                </p>
              </div>
            `;
                }

            } catch (err) {
                console.error(err);
                container.innerHTML = `<div>Error loading payment options</div>`;
            }
        }
    }

    window.RiskCheckout = RiskCheckout;
})(window);
