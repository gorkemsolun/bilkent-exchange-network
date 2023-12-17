/**
 * Checks if the given email is valid.
 * @param email - The email to be validated.
 * @returns True if the email is valid, false otherwise.
 */
export function isValidEmail(email: string) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Checks if the given email is a valid Bilkent email.
 * @param email - The email to be validated.
 * @returns True if the email is a valid Bilkent email, false otherwise.
 */
export function isValidBilkentEmail(email: string) {
  // Regular expression for a Bilkent email validation
  const bilkentEmailRegex = /^[^\s@]+@ug\.bilkent\.edu\.tr$/;
  return bilkentEmailRegex.test(email);
}
