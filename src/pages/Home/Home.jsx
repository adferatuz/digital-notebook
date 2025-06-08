import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          Bienvenido a Mi Aplicación
        </h1>
        <p className={styles.subtitle}>
          Gestiona tus cuadernos digitales de forma fácil y eficiente
        </p>
        <div className={styles.actions}>
          <Link to="/credentials-access">
            <Button variant="primary" size="large">
              Presentar prueba
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>Instrucciones de uso: </h3>
          <p><b>Paso 1.</b> Necesitas credenciales para poder acceder a la prueba. </p>
          <p><b>Paso 2.</b>  Dar click en el botón Presentar prueba. </p>
          <p><b>Paso 3.</b>  Llenar el formulario de credenciales para poder acceder a la prueba. </p>
          <p><b>Paso 4.</b>  Sigue los pasos para completar el formulario correspondiente a la prueba. </p>
        </div>
        <div className={styles.feature}>
          <h3>Términos y Condiciones de Uso</h3>
          <p>Al utilizar esta aplicación, aceptas cumplir con los siguientes términos y condiciones de uso. Te pedimos que leas atentamente cada punto antes de continuar. 🔀</p>
        </div>
        <div className={styles.feature}>
          <p><strong>1. Acceso a la prueba:</strong> Para poder presentar la prueba, es obligatorio contar con credenciales válidas otorgadas previamente. Estas credenciales son personales e intransferibles.</p>

          <p><strong>2. Inicio del proceso:</strong> El proceso de acceso se inicia dando clic en el botón <strong>“Presentar prueba”</strong>, lo cual te redirigirá al formulario de autenticación correspondiente.</p>

          <p><strong>3. Autenticación:</strong> Deberás completar el formulario de credenciales con tu información de acceso. Es tu responsabilidad garantizar la veracidad de los datos ingresados.</p>

          <p><strong>4. Desarrollo de la prueba:</strong> Una vez autenticado correctamente, podrás continuar con los pasos establecidos para realizar la prueba. El sistema guiará tu progreso mediante formularios diseñados para ese fin.</p>

          <p>El uso indebido de la aplicación, el intento de acceder sin autorización o el suministro de datos falsos puede conllevar a la suspensión del acceso y a medidas adicionales según la normativa aplicable.</p>

          <p>El uso de esta aplicación implica la aceptación de estos términos. Si no estás de acuerdo con alguno de ellos, por favor no accedas a la prueba.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;