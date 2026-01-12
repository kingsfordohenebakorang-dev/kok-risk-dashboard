# 🔧 How to Fix "Invalid Configuration" on Vercel

That red "Invalid Configuration" error means your Domain isn't pointing to Vercel yet. You need to log in to where you bought the domain (Namecheap, GoDaddy, etc.) and change the **DNS Records**.

## Step 1: Log in to your Domain Provider
Go to Namecheap, GoDaddy, or wherever you bought `kok-risk.com`.
Look for a button like **"Manage DNS"**, **"Advanced DNS"**, or **"DNS Records"**.

## Step 2: Delete Old Records
If you see any existing "A Records" or "CNAME Records" that assume "Parking" or "Default", **delete them**.

## Step 3: Add These 2 Records (Exact Config)

### Record #1 (Root Domain)
This makes `kok-risk.com` work.
*   **Type:** `A Record`
*   **Host/Name:** `@` (or leave blank if `@` is not allowed)
*   **Value/Target:** `76.76.21.21`
*   **TTL:** `Automatic` (or 14400)

### Record #2 (WWW Subdomain)
This makes `www.kok-risk.com` work.
*   **Type:** `CNAME Record`
*   **Host/Name:** `www`
*   **Value/Target:** `cname.vercel-dns.com`
*   **TTL:** `Automatic`

---

## Step 4: Wait for "Propogation"
1.  Save the changes in your Domain Provider.
2.  Go back to Vercel.
3.  It might still say "Invalid" for a few minutes (or up to 1 hour).
4.  Hit **Refresh** on the Vercel page occasionally. 
5.  Once it turns **Green**, your site is live! 🌍

## Troubleshooting
*   **"I can't add records!"**: Check if your "Nameservers" are set to "Custom". Change them back to **Default Nameservers** (BasicDNS) so you can edit records.
