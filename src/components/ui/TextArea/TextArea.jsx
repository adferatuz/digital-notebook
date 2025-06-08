import { forwardRef } from 'react';
import styles from './TextArea.module.css';

const TextArea = forwardRef(({ 
  label,
  error,
  className = '',
  id,
  rows = 4,
  ...props 
}, ref) => {
  const textareaId = id || `textarea-${Math.random().toString(36).slice(2, 11)}`;
  
  return (
    <div className={`${styles.textareaGroup} ${className}`}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={`${styles.textarea} ${error ? styles.error : ''}`}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;