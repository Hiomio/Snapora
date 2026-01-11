/**
 * Auth utility functions
 */

/**
 * Validates password strength
 * @param {string} password - The password to validate
 * @returns {Object} - Validation result with score and message
 */
export const validatePasswordStrength = (password) => {
  if (!password) {
    return { score: 0, message: "Enter a password" };
  }
  
  // Calculate password strength score (0-4)
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 10) score += 1;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score += 0.5;
  if (/[a-z]/.test(password)) score += 0.5;
  if (/[0-9]/.test(password)) score += 0.5;
  if (/[^A-Za-z0-9]/.test(password)) score += 0.5;
  
  // Round the score to the nearest integer (0-4)
  score = Math.min(4, Math.round(score));
  
  // Return message based on score
  const messages = [
    "Weak: Add more characters",
    "Fair: Getting better",
    "Good: Almost there",
    "Strong: Good password",
    "Excellent: Great password!"
  ];
  
  return {
    score,
    message: messages[score]
  };
};

/**
 * Validates an email address format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a username format
 * @param {string} username - The username to validate
 * @returns {boolean} - Whether the username is valid
 */
export const isValidUsername = (username) => {
  // Only letters, numbers, and underscores, 3-30 characters
  const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
  return usernameRegex.test(username);
}; 