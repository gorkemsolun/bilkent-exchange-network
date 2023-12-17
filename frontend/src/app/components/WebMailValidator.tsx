export function isValidEmail(email: string) {
  // Regular expression for a simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidBilkentEmail(email: string) {
  // Regular expression for a Bilkent email validation
  const bilkentEmailRegex = /^[^\s@]+@ug\.bilkent\.edu\.tr$/;
  return bilkentEmailRegex.test(email);
}
