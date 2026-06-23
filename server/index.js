import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, company, evaluation, message, captchaToken } = req.body;

  if (!firstName || !lastName || !email || !message || !captchaToken) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: captchaToken,
    }),
  });

  const turnstileData = await turnstileResponse.json();

  if (!turnstileData.success) {
    return res.status(403).json({ error: 'Verification failed. Please try again.' });
  }

  try {
    const formspreeResponse = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_FORM_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, company, evaluation, message }),
    });

    if (!formspreeResponse.ok) {
      const body = await formspreeResponse.text();
      console.error('Formspree error response:', body);
      throw new Error('Formspree submission failed');
    }

    const formspreeData = await formspreeResponse.json();
    res.json({ success: true, message: 'Message sent successfully.', formspreeData });
  } catch (err) {
    console.error('Formspree error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
