// Email service for sending contact form messages
// Uses backend Nodemailer service

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

// Backend endpoint for email sending
// Use production URL when deployed, localhost for development
const BACKEND_EMAIL_ENDPOINT = import.meta.env.PROD 
  ? 'https://your-backend-domain.com/api/send-email'  // Replace with your production backend URL
  : 'http://localhost:3001/api/send-email';
const RECIPIENT_EMAIL = 'satoshiengineer92@gmail.com';

/**
 * Send email using backend Nodemailer service
 * This is the primary method for sending emails
 */

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
 * Uses backend endpoint with fallback to mailto
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<EmailServiceResponse> => {
  // Try backend endpoint first (primary method)
  try {
    const backendResult = await sendEmailWithBackend(formData);
    if (backendResult.success) {
      return backendResult;
    }
  } catch (error) {
    console.warn('Backend email failed, using fallback:', error);
  }

  // Fallback: Open email client
  const mailtoLink = createMailtoLink(formData);
  window.open(mailtoLink, '_blank');
  
  return {
    success: true,
    message: 'Email client opened. Please send the email manually.'
  };
};
