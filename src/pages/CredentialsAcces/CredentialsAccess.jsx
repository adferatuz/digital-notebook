import CredentialsForm from '../../components/forms/credentialsForm/CredentialsForm';
import styles from './CredentialsAccess.module.css';

const CredentialsAccess = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CredentialsForm />
      </div>
    </div>
  );
};

export default CredentialsAccess;