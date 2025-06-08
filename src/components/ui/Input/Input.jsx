import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(({ 
  label,
  error,
  className = '',
  id,
  ...props 
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 11)}`;
  
  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`${styles.input} ${error ? styles.error : ''}`}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;