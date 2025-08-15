const fs = require('fs');
const path = require('path');

// Read the email template
let emailTemplate = fs.readFileSync(path.join(__dirname, 'email-marketing-template.html'), 'utf8');

// Inject a server-side countdown replacement since email clients do not run JS
function buildCountdownText() {
  // 11:00 UK time window: start 2025-08-15 10:00:00Z (11:00 BST) to end 2025-08-16 10:00:00Z (11:00 BST)
  const startDateUtc = new Date('2025-08-15T10:00:00Z');
  const targetDateUtc = new Date('2025-08-16T10:00:00Z');
  const nowUtc = new Date();

  if (nowUtc < startDateUtc) {
    return 'Starting Soon';
  }

  const timeRemainingMs = targetDateUtc.getTime() - nowUtc.getTime();
  if (timeRemainingMs <= 0) {
    return 'Offer Expired';
  }

  const totalSeconds = Math.floor(timeRemainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const two = (n) => String(n).padStart(2, '0');
  if (days > 0) {
    return `${two(days)}d ${two(hours)}:${two(minutes)}:${two(seconds)}`;
  }
  return `${two(hours)}:${two(minutes)}:${two(seconds)}`;
}

// Replace the placeholder in the template (first occurrence) with server-side value
emailTemplate = emailTemplate.replace('00:00:00', buildCountdownText());

// Postmark configuration
const POSTMARK_API_TOKEN = '37e3388d-e02d-4a57-83d6-0fc35554914d';
const FROM_EMAIL = 'admin@fence-net.com';
const TO_EMAIL = 'admin@fence-net.com';

// Email data
const emailData = {
  From: FROM_EMAIL,
  To: TO_EMAIL,
  Subject: 'Your Free Website Offer - Limited Time!',
  HtmlBody: emailTemplate,
  MessageStream: 'outbound' // or 'broadcast' for marketing emails
};

console.log('Email template loaded successfully!');
console.log('Template size:', emailTemplate.length, 'characters');
console.log('\nTo send this email:');
console.log('1. Sign up at https://postmarkapp.com/');
console.log('2. Verify your sender domain/email');
console.log('3. Get your API token from the API tab');
console.log('4. Update the POSTMARK_API_TOKEN and FROM_EMAIL variables above');
console.log('5. Run: npm install node-fetch');
console.log('6. Run: node send-email.js');

const fetch = require('node-fetch');

async function sendEmail() {
  try {
    const response = await fetch('https://api.postmarkapp.com/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_TOKEN
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('Email sent successfully!');
      console.log('Message ID:', result.MessageID);
    } else {
      console.error('Failed to send email:', result);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendEmail();
