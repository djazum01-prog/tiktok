# TikTok Clone

This is a static TikTok-like demo app (HTML/CSS/JS) with added features: login (demo), monetization, go-live simulation, and an Owner/Creator Portal. It includes **M-Pesa (Safaricom Daraja) integration** for real coin purchases.

## Quick local run

1. Open a terminal in the project folder (where `index.html` lives).

2. Install dependencies and start the server:

```bash
npm install
npm start
```

3. Open http://localhost:3000 in your browser.

## M-Pesa (Daraja) Setup

### Prerequisites
- A Safaricom Daraja app and credentials (sandbox or production).
- M-Pesa STK Push enabled.

### Local Setup

1. **Copy `.env.example` to `.env`** and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey
MPESA_ENV=sandbox
MPESA_CALLBACK_URL=https://your-public-url/api/mpesa/callback
PORT=3000
```

2. **For local testing with Daraja callbacks, use ngrok**:
   - Install ngrok: https://ngrok.com/download
   - Start the server and expose it:

```bash
npm install -g ngrok
npm start
# in another terminal:
ngrok http 3000
```

   - Copy the ngrok URL (e.g., `https://abc123.ngrok.io`) and update `.env`:
```
MPESA_CALLBACK_URL=https://abc123.ngrok.io/api/mpesa/callback
```

3. **Restart the server** with the updated `.env`:

```bash
npm start
```

### Automated Dev Start Script

Use the included script to start the server and ngrok together:

**Linux/Mac:**
```bash
chmod +x start-dev.sh
./start-dev.sh
```

**Windows (PowerShell):**
```powershell
.\start-dev.ps1
```

Or manually in two terminals:
```bash
# Terminal 1: start server
npm start

# Terminal 2: expose with ngrok
ngrok http 3000
```

### Test Payment Flow

1. Login (any email/password).
2. Open Monetization → "Buy Coins".
3. Enter a phone number (e.g., `254712345678`) and click "Pay (STK)".
4. **In sandbox mode**, the app will simulate success and add coins. **In production**, Safaricom will send an STK prompt to the phone.
5. Confirm the payment on your phone to complete the transaction.

**Note:** If M-Pesa credentials are not configured, the app will automatically simulate payments for demo purposes.

## Deploy options

Option A — GitHub Pages (using GitHub Actions)

1. Push this repository to GitHub (default branch `main`).
2. The included workflow `.github/workflows/deploy.yml` will automatically deploy the repository root to the `gh-pages` branch on push to `main`.
3. Enable GitHub Pages in repository Settings → Pages (if not automatically configured). The site will be served from the `gh-pages` branch.

Option B — Vercel

1. Sign in at https://vercel.com and import the repository.
2. For a static site, Vercel will detect it automatically. Deploy and it will provide a production URL.

Option C — Netlify

1. Go to https://app.netlify.com/sites/new and drag-and-drop your project folder (or connect the Git repo).
2. For static site: publish directory is the repo root.

Option D — Simple Node static server (already included)

- Run `npm install` then `npm start`. This uses `server.js` (Express) to serve files on `PORT` (defaults to 3000).

## CI: GitHub Actions

A GitHub Actions workflow is included that will deploy to GitHub Pages when you push to `main`.

## Notes & Security

- **Demo mode**: Without M-Pesa credentials, the app simulates payments and coin purchases.
- **Sandbox vs. Production**: Set `MPESA_ENV=sandbox` for testing or `MPESA_ENV=production` for live payments. Always test in sandbox first.
- **Callback endpoint**: In production, validate and secure the `/api/mpesa/callback` endpoint (signature verification, IP allowlist, etc.).
- **No real authentication**: This demo uses client-side login. For production, implement secure OAuth or server-side session authentication.

## Troubleshooting

- **"Cannot find module 'axios'"**: Run `npm install` to install dependencies.
- **"ngrok command not found"**: Install ngrok globally: `npm install -g ngrok` or download from https://ngrok.com.
- **Callback not received**: Ensure your ngrok URL is correct in `.env` and the server is running.
- **STK Push failed**: Verify Daraja credentials and ensure the phone number format is valid (e.g., `254712345678`).

## Next Steps

- Integrate a real database (e.g., MongoDB, Postgres) to persist user balances and transactions.
- Add user authentication (OAuth, JWT) and secure sessions.
- Implement streaming endpoints for true live video (WebRTC/RTMP).
- Add server-side coin tracking and withdrawal/payout flows.
