require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Simple in-memory store for demo transactions
const transactions = [];

// Helper: get OAuth token from Daraja
async function getAccessToken() {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  if (!key || !secret) return null; // signal simulator fallback

  const tokenUrl = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
  try {
    const res = await axios.get(tokenUrl, {
      auth: { username: key, password: secret }
    });
    return res.data.access_token;
  } catch (err) {
    console.error('Error fetching access token', err.message);
    return null;
  }
}

// STK Push endpoint - initiate payment
app.post('/api/mpesa/stkpush', async (req, res) => {
  const { amount, phone, accountReference = 'TiktokDemo', description = 'Buy coins' } = req.body;

  // if credentials not set, simulate success
  const token = await getAccessToken();
  if (!token) {
    const fake = { MerchantRequestID: 'SIM-'+Date.now(), CheckoutRequestID: 'STK_SIM_'+Date.now() };
    transactions.push({ id: fake.CheckoutRequestID, amount, phone, status: 'SIMULATED' });
    return res.json({ success: true, simulated: true, data: fake });
  }

  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0,14);
  const password = Buffer.from(shortcode + passkey + timestamp).toString('base64');

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone.replace(/[^0-9]/g, ''),
    PartyB: shortcode,
    PhoneNumber: phone.replace(/[^0-9]/g, ''),
    CallBackURL: process.env.MPESA_CALLBACK_URL || `http://localhost:${PORT}/api/mpesa/callback`,
    AccountReference: accountReference,
    TransactionDesc: description
  };

  try {
    const endpoint = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const r = await axios.post(endpoint, payload, { headers: { Authorization: `Bearer ${token}` } });
    transactions.push({ id: r.data.CheckoutRequestID || Date.now(), amount, phone, status: 'PENDING', raw: r.data });
    return res.json({ success: true, data: r.data });
  } catch (err) {
    console.error('STK Push error', err.response?.data || err.message);
    return res.status(500).json({ success: false, error: err.response?.data || err.message });
  }
});

// Callback endpoint Daraja will call
app.post('/api/mpesa/callback', (req, res) => {
  // In production you must validate and secure this endpoint
  const body = req.body;
  transactions.push({ id: body.Body?.stkCallback?.CheckoutRequestID || Date.now(), rawCallback: body });
  console.log('Received mpesa callback', JSON.stringify(body).slice(0,400));
  res.json({ success: true });
});

// Simple endpoint to view simulated transactions
app.get('/api/mpesa/tx', (req, res) => {
  res.json(transactions);
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
