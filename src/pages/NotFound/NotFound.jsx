import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Página no encontrada</h2>
        <p className={styles.description}>
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button variant="primary">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;