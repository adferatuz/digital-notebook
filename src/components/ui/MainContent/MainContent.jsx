import styles from './MainContent.module.css';
import CredentialGenerator from '../../forms/CredentialGenerator/CredentialGenerator';

const MainContent = ({ activeView, testSessions, isLoading, error, addTestSession }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'credential-generator':
        return (
          <CredentialGenerator 
            testSessions={testSessions}
            isLoading={isLoading}
            error={error}
            addTestSession={addTestSession}
          />
        );
      default:
        return (
          <div className={styles.placeholder}>
            <img src="/psychology-background.svg" alt="Psychology" className={styles.placeholderImage} />
            <p>Selecciona una opción del menú para comenzar</p>
          </div>
        );
    }
  };

  return <main className={styles.mainContent}>{renderContent()}</main>;
};

export default MainContent;