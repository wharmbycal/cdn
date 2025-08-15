# Postmark Setup Guide for Email Marketing Template

## Step 1: Sign Up for Postmark
1. Go to [https://postmarkapp.com/](https://postmarkapp.com/)
2. Click "Get Started" and create an account
3. Choose the plan that fits your needs (they have a free tier for testing)

## Step 2: Verify Your Sender Domain/Email
1. In Postmark dashboard, go to "Sending" → "Sending Domains"
2. Add your domain (e.g., yourdomain.com)
3. Follow the DNS verification steps provided
4. OR verify a single email address for testing

## Step 3: Get Your API Token
1. In Postmark dashboard, go to "API" tab
2. Copy your "Server API Token" (starts with something like `12345678-1234-1234-1234-123456789abc`)

## Step 4: Update the Script
1. Open `send-email.js`
2. Replace `YOUR_POSTMARK_API_TOKEN_HERE` with your actual API token
3. Replace `your-verified-sender@yourdomain.com` with your verified sender email

## Step 5: Send Test Email
1. Run: `node send-email.js`
2. Check your email at wharmbycal@gmail.com

## Important Notes:
- **Sender Verification**: You must verify your sender email/domain before sending
- **Rate Limits**: Postmark has rate limits based on your plan
- **Testing**: Start with the free tier to test before upgrading
- **Compliance**: Ensure you're following email marketing laws (CAN-SPAM, GDPR, etc.)

## Troubleshooting:
- If you get "Sender not verified" error, check your domain/email verification status
- If you get "Invalid API token", double-check your token
- If emails aren't delivered, check your spam folder and Postmark's delivery logs

## Alternative: Use Postmark's Web Interface
You can also:
1. Go to "Templates" in Postmark
2. Create a new template
3. Copy the HTML from `email-marketing-template.html`
4. Send test emails directly from the dashboard

## Next Steps:
After successful testing:
1. Update the countdown timer dates if needed
2. Customize the subject line and content
3. Set up proper email lists and segmentation
4. Monitor delivery rates and engagement metrics
