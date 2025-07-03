import DigitalNotebookForm from '../../components/forms/DigitalNoteBookForm/DigitalNoteBookForm';
import styles from './DigitalNotebook.module.css';

const DigitalNotebook = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <DigitalNotebookForm />
      </div>
    </div>
  );
};

export default DigitalNotebook;