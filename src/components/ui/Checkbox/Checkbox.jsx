import { forwardRef } from 'react';
import styles from './Checkbox.module.css';

const Checkbox = forwardRef(({ 
  label,
  error,
  className = '',
  id,
  ...props 
}, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;
  
  return (
    <div className={`${styles.checkboxGroup} ${className}`}>
      <div className={styles.checkboxWrapper}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={`${styles.checkbox} ${error ? styles.error : ''}`}
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} className={styles.label}>
            {label}
          </label>
        )}
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;