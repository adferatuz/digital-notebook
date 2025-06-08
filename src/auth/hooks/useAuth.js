import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validateField = useCallback((name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.requiredMessage || `${name} es requerido`;
    }

    if (rule.minLength && value.length < rule.minLength) {
      return rule.minLengthMessage || `${name} debe tener al menos ${rule.minLength} caracteres`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.maxLengthMessage || `${name} no puede tener más de ${rule.maxLength} caracteres`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.patternMessage || `${name} tiene un formato inválido`;
    }

    if (rule.custom && typeof rule.custom === 'function') {
      return rule.custom(value) || '';
    }

    return '';
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValue(name, fieldValue);
  }, [setValue]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setFieldTouched(name);
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [setFieldTouched, validateField]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    setValue,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    isValid: Object.keys(errors).length === 0
  };
};