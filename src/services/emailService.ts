// Email service for sending contact form messages
// This service can be configured to use various email providers

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface EmailServiceResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// EmailJS configuration (you'll need to set up EmailJS account and get these values)
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
const RECIPIENT_EMAIL = 'satoshiengineer92@gmail.com';

// Backend endpoint for email sending
const BACKEND_EMAIL_ENDPOINT = 'http://localhost:3001/api/send-email';

/**
 * Send email using EmailJS (recommended for frontend-only solutions)
 * You need to:
 * 1. Create an EmailJS account at https://www.emailjs.com/
 * 2. Set up an email service (Gmail, Outlook, etc.)
 * 3. Create an email template
 * 4. Replace the configuration values above
 */
export const sendEmailWithEmailJS = async (formData: ContactFormData): Promise<EmailServiceResponse> => {
  try {
    // Dynamic import to avoid build issues if EmailJS is not installed
    const emailjs = await import('@emailjs/browser');
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      project_type: formData.projectType,
      message: formData.message,
      to_email: RECIPIENT_EMAIL,
    };

    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    return {
      success: true,
      message: 'Email sent successfully!'
    };
  } catch (error: any) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send email'
    };
  }
};

/**
 * Send email using a backend API endpoint
 * This requires a backend service to handle email sending
 */
export const sendEmailWithBackend = async (formData: ContactFormData): Promise<EmailServiceResponse> => {
  try {
    const response = await fetch(BACKEND_EMAIL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        recipient: RECIPIENT_EMAIL,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Email sent successfully!'
    };
  } catch (error: any) {
    console.error('Backend Email Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send email'
    };
  }
};

/**
 * Fallback: Create a mailto link (opens user's email client)
 * This is a simple fallback that doesn't require any external services
 */
export const createMailtoLink = (formData: ContactFormData): string => {
  const subject = encodeURIComponent(`Contact Form: ${formData.projectType || 'General Inquiry'}`);
  const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Project Type: ${formData.projectType || 'Not specified'}

Message:
${formData.message}
  `);
  
  return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
};

/**
 * Main email sending function
 * Uses backend endpoint by default, with fallback to mailto
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<EmailServiceResponse> => {
  // Try backend endpoint first (primary method)
  try {
    const backendResult = await sendEmailWithBackend(formData);
    if (backendResult.success) {
      return backendResult;
    }
  } catch (error) {
    console.warn('Backend email failed, trying fallback:', error);
  }

  // Try EmailJS as secondary option (if configured)
  if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID') {
    try {
      const emailjsResult = await sendEmailWithEmailJS(formData);
      if (emailjsResult.success) {
        return emailjsResult;
      }
    } catch (error) {
      console.warn('EmailJS failed, using fallback:', error);
    }
  }

  // Fallback: Open email client
  const mailtoLink = createMailtoLink(formData);
  window.open(mailtoLink, '_blank');
  
  return {
    success: true,
    message: 'Email client opened. Please send the email manually.'
  };
};
