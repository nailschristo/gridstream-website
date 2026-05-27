/**
 * Form Security Utilities
 * Provides functions for form validation, sanitization, and reCAPTCHA verification
 */

// reCAPTCHA verification
export const verifyCaptcha = async () => {
  // Make sure grecaptcha is available
  if (typeof grecaptcha === 'undefined') {
    console.error('reCAPTCHA not loaded');
    throw new Error('reCAPTCHA not loaded');
  }
  
  try {
    // Replace 'SITE_KEY' with your actual reCAPTCHA site key in production
    const token = await grecaptcha.execute('6LcXXXXXXXXXXXXXXXXXXXX', {action: 'submit'});
    return token;
  } catch (error) {
    console.error('reCAPTCHA execution failed:', error);
    throw new Error('Could not verify you are human. Please try again.');
  }
};

// Enhanced validation patterns
export const validationPatterns = {
  email: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
    message: 'Please enter a valid phone number'
  },
  name: {
    value: /^[a-zA-Z\s'-]{2,50}$/,
    message: 'Please enter a valid name (2-50 characters)'
  },
  company: {
    value: /^[a-zA-Z0-9\s&.,'-]{2,100}$/,
    message: 'Please enter a valid company name (2-100 characters)'
  }
};

// Input sanitization for strings
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
    // Only sanitize characters that pose actual security risks (< > ")
    // Removed sanitization of ' \ / as they're common in normal text
    // and were causing issues with category names and other form data
};

// Sanitize all form data
export const sanitizeFormData = (data) => {
  const sanitized = {};
  Object.keys(data).forEach(key => {
    // Skip honeypot field
    if (key === 'bot-field') {
      sanitized[key] = data[key];
      return;
    }
    
    if (typeof data[key] === 'string') {
      sanitized[key] = sanitizeInput(data[key]);
    } else if (Array.isArray(data[key])) {
      sanitized[key] = data[key].map(item => 
        typeof item === 'string' ? sanitizeInput(item) : item
      );
    } else {
      sanitized[key] = data[key];
    }
  });
  return sanitized;
};
