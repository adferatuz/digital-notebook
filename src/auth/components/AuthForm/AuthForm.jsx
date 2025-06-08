import { useState } from "react";
import FormHeader from "../../../components/forms/FormHeader";
import Button from "../../../components/ui/Button";
import Checkbox from "../../../components/ui/Checkbox";
import Input from "../../../components/ui/Input";
import { useForm } from "../../hooks/useAuth";
import { 
  FORM_FIELDS, 
  VALIDATION_RULES, 
  INITIAL_VALUES, 
  handleFormSubmission 
} from "./AuthForm.logic";

import styles from "./AuthForm.module.css";

const AuthForm = ({onClose}) => {
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
                title="Bienvenida a tu aplicación"
                subtitle="Inicia sesión para continuar"
                onClose={onClose}
            />

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formFields}>
                    <div className={styles.row}>
                        <Input
                            label="Username"
                            name={FORM_FIELDS.USERNAME}
                            value={values[FORM_FIELDS.USERNAME]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors[FORM_FIELDS.USERNAME]}
                            placeholder="Username"
                        />

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
                            label="Password"
                            name={FORM_FIELDS.PASSWORD}
                            type="password"
                            value={values[FORM_FIELDS.PASSWORD]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors[FORM_FIELDS.PASSWORD]}
                            placeholder="Password"
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
                        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleReset}
                        disabled={isSubmitting}
                    >
                        ¿Olvidaste tu contraseña?
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

export default AuthForm;