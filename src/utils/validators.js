export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== '';
};

export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isNumber = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

export const isPositiveNumber = (value) => {
  return isNumber(value) && parseFloat(value) > 0;
};

export const hasMinLength = (value, minLength) => {
  return value && value.toString().length >= minLength;
};

export const hasMaxLength = (value, maxLength) => {
  return value && value.toString().length <= maxLength;
};

export const isValidAge = (age) => {
  const numAge = parseInt(age, 10);
  return numAge >= 0 && numAge <= 120;
};

export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

export const isFutureDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};

export const isPastDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date < today;
};