# Email Setup Guide

This guide explains how to configure email functionality for the contact form in your portfolio.

## Current Implementation

The contact form is now configured to send emails to `satoshiengineer92@gmail.com` when users submit the contact form.

## Setup Options

### Option 1: EmailJS (Recommended for Frontend-Only Solutions)

EmailJS is a service that allows you to send emails directly from the frontend without a backend.

#### Steps:
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{project_type}}` - Project type
   - `{{message}}` - Message content
   - `{{to_email}}` - Recipient email (satoshiengineer92@gmail.com)
4. Get your Service ID, Template ID, and Public Key
5. Update the configuration in `src/services/emailService.ts`:
   ```typescript
   const EMAILJS_SERVICE_ID = 'your_service_id_here';
   const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
   const EMAILJS_PUBLIC_KEY = 'your_public_key_here';
   ```

#### Email Template Example:
```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}} ({{from_email}})
Project Type: {{project_type}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

### Option 2: Backend API Endpoint

If you have a backend server, you can create an API endpoint to handle email sending.

#### Steps:
1. Create a backend endpoint (e.g., `/api/send-email`)
2. Update the `BACKEND_EMAIL_ENDPOINT` in `src/services/emailService.ts`
3. Implement email sending on your backend using services like:
   - Nodemailer (Node.js)
   - SendGrid
   - AWS SES
   - SMTP

#### Backend Endpoint Example (Node.js with Nodemailer):
```javascript
app.post('/api/send-email', async (req, res) => {
  const { name, email, projectType, message, recipient } = req.body;
  
  try {
    // Configure your email service here
    const transporter = nodemailer.createTransporter({
      // Your email service configuration
    });
    
    const mailOptions = {
      from: email,
      to: recipient,
      subject: `Contact Form: ${projectType}`,
      text: `Name: ${name}\nEmail: ${email}\nProject: ${projectType}\n\nMessage:\n${message}`
    };
    
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Option 3: Fallback (Current Default)

If no email service is configured, the form will open the user's email client with a pre-filled message. This is a simple fallback that works without any external services.

## Testing

1. Fill out the contact form
2. Submit the form
3. Check your email (satoshiengineer92@gmail.com) for the message
4. If using EmailJS, check the EmailJS dashboard for delivery status

## Troubleshooting

### EmailJS Issues:
- Verify your Service ID, Template ID, and Public Key are correct
- Check that your email service is properly configured in EmailJS
- Ensure your email template has the correct variable names

### Backend Issues:
- Verify your API endpoint is accessible
- Check server logs for errors
- Ensure your email service credentials are correct

### General Issues:
- Check browser console for error messages
- Verify network connectivity
- Test with different email addresses

## Security Notes

- Never expose sensitive credentials in frontend code
- Use environment variables for configuration in production
- Consider rate limiting for the contact form
- Validate and sanitize form inputs

## Current Status

The contact form is now configured to:
- ✅ Update Discord link to server invite (https://discord.gg/ZKbuj7ZV)
- ✅ Send emails to satoshiengineer92@gmail.com
- ✅ Provide multiple email service options
- ✅ Include fallback functionality

To complete the setup, choose one of the email service options above and configure it according to the instructions.
