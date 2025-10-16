// Simple email service that works without external dependencies
// This version uses mailto links as the primary method

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

const RECIPIENT_EMAIL = 'satoshiengineer92@gmail.com';

/**
 * Create a mailto link with pre-filled email content
 * This is a simple fallback that works without any backend
 */
export const createMailtoLink = (formData: ContactFormData): string => {
  const subject = encodeURIComponent(`Portfolio Contact: ${formData.projectType || 'General Inquiry'} from ${formData.name}`);
  const body = encodeURIComponent(`
Hello,

I'm interested in discussing a project with you.

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Project Type: ${formData.projectType || 'Not specified'}

Message:
${formData.message}

---
This message was sent from your portfolio contact form.
  `);
  
  return `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
};

/**
 * Send contact email by opening the user's email client
 * This is the simplest approach that works everywhere
 */
export const sendContactEmail = async (formData: ContactFormData): Promise<EmailServiceResponse> => {
  try {
    const mailtoLink = createMailtoLink(formData);
    
    // Try to open the email client
    if (window && window.open) {
      window.open(mailtoLink, '_blank');
    } else {
      // Fallback: try to navigate to the mailto link
      window.location.href = mailtoLink;
    }
    
    return {
      success: true,
      message: 'Email client opened. Please send the email to complete your message.'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to open email client'
    };
  }
};
