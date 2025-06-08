import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { 
  FORM_FIELDS, 
  VALIDATION_RULES, 
  INITIAL_VALUES, 
  handleFormSubmission 
} from './DigitalNotebookForm.logic';

import FormHeader from '../FormHeader';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Checkbox from '../../ui/Checkbox';
import Button from '../../ui/Button';

import styles from './DigitalNotebookForm.module.css';

const DigitalNotebookForm = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateForm,
    resetForm
  } = useForm(INITIAL_VALUES, VALIDATION_RULES);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const result = await handleFormSubmission(values);
      
      if (result.success) {
        setSubmitMessage('¡Formulario enviado correctamente!');
        resetForm();
      } else {
        setSubmitMessage('Error al enviar el formulario. Inténtalo de nuevo.');
      }
    } catch (error) {
      setSubmitMessage(`Error inesperado. Inténtalo de nuevo. ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    resetForm();
    setSubmitMessage('');
  };

  return (
    <div className={styles.container}>
      <FormHeader 
        title="FORMULARIO DE DIGITAL NOTEBOOK"
        subtitle="Este formulario es de una prueba EDAH"
        onClose={onClose}
      />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formFields}>
          <div className={styles.row}>
            <Input
              label="Evaluador"
              name={FORM_FIELDS.EVALUADOR}
              value={values[FORM_FIELDS.EVALUADOR]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors[FORM_FIELDS.EVALUADOR]}
              placeholder="Nombre completo"
            />
            
            <Input
              label="Edad"
              name={FORM_FIELDS.EDAD}
              type="number"
              value={values[FORM_FIELDS.EDAD]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors[FORM_FIELDS.EDAD]}
              placeholder="00-000-AA"
            />
          </div>

          <Input
            label="Fecha"
            name={FORM_FIELDS.FECHA}
            type="date"
            value={values[FORM_FIELDS.FECHA]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[FORM_FIELDS.FECHA]}
            className={styles.dateField}
          />

          <TextArea
            label="Contenido"
            name={FORM_FIELDS.CONTENT}
            value={values[FORM_FIELDS.CONTENT]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[FORM_FIELDS.CONTENT]}
            placeholder="Ingrese el contenido aquí..."
            rows={8}
            className={styles.contentField}
          />

          <Checkbox
            label="Términos de política y privacidad"
            name={FORM_FIELDS.TERMS}
            checked={values[FORM_FIELDS.TERMS]}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors[FORM_FIELDS.TERMS]}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Limpiar
          </Button>
        </div>

        {submitMessage && (
          <div className={`${styles.message} ${submitMessage.includes('Error') ? styles.error : styles.success}`}>
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default DigitalNotebookForm;