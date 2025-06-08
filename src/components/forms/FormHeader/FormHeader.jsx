import styles from './FormHeader.module.css';

const FormHeader = ({ title, subtitle, onClose }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {onClose && (
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default FormHeader;