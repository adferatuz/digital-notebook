import { useState } from "react";
import FormHeader from "../FormHeader/FormHeader";
import Button from "../../ui/Button/Button";
import Checkbox from "../../ui/Checkbox/Checkbox";
import Input from "../../ui/Input/Input";
import { useForm } from "../../../hooks/useForm";
import { 
  FORM_FIELDS, 
  VALIDATION_RULES, 
  INITIAL_VALUES, 
  handleFormSubmission 
} from "./CredentialsForm.logic";

import styles from "./CredentialsForm.module.css";

const CredentialsForm = ({onClose}) => {
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
                title="Ingresar con credenciales"
                subtitle="Ingresa tu correo electrónico y token de acceso generado por tu especialista para continuar."
                onClose={onClose}
            />

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formFields}>
                    <div className={styles.row}>
                        <Input
                            label="Email"
                            name={FORM_FIELDS.EMAIL}
                            type="email"
                            value={values[FORM_FIELDS.EMAIL]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors[FORM_FIELDS.EMAIL]}
                            placeholder="Email"
                        />
                        <Input
                            label="Token de acceso"
                            name={FORM_FIELDS.TOKEN_ACCESS}
                            type="text"
                            value={values[FORM_FIELDS.TOKEN_ACCESS]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors[FORM_FIELDS.TOKEN_ACCESS]}
                            placeholder="Please enter your token access"
                        />
                    </div>

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
                        Limpiar formulario
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

export default CredentialsForm;