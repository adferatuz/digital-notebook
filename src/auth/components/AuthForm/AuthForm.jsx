import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "../../../components/forms/FormHeader";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useAuth } from "../../../hooks/useAuth";
import { useForm } from "../../../hooks/useForm";


import styles from "./AuthForm.module.css";

// Define constants for form fields
const FORM_FIELDS = {
    EMAIL: 'email',
    PASSWORD: 'password',
};

// Define validation rules
const VALIDATION_RULES = {
    [FORM_FIELDS.EMAIL]: { required: true, isEmail: true },
    [FORM_FIELDS.PASSWORD]: { required: true, minLength: 6 },
};

// Define initial values
const INITIAL_VALUES = {
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.PASSWORD]: '',
};

const AuthForm = ({ onClose }) => {
    const navigate = useNavigate();
    const { user, error: authError, isLoading, signIn } = useAuth();
    
    const {
        values,
        errors,
        handleChange,
        handleBlur,
        validateForm,
    } = useForm(INITIAL_VALUES, VALIDATION_RULES);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        await signIn(values.email, values.password);
    };

    useEffect(() => {
        if (user) {
            navigate("/dashboard"); // Redirect to dashboard on successful login
        }
    }, [user, navigate]);

    return (
        <div className={styles.container}>
            <FormHeader
                title="Bienvenida a tu aplicación"
                subtitle="Inicia sesión para continuar"
                onClose={onClose}
            />

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formFields}>
                    <Input
                        label="Email"
                        name={FORM_FIELDS.EMAIL}
                        type="email"
                        value={values[FORM_FIELDS.EMAIL]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors[FORM_FIELDS.EMAIL]}
                        placeholder="tu@email.com"
                    />
                    <Input
                        label="Password"
                        name={FORM_FIELDS.PASSWORD}
                        type="password"
                        value={values[FORM_FIELDS.PASSWORD]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors[FORM_FIELDS.PASSWORD]}
                        placeholder="Contraseña"
                    />
                </div>

                <div className={styles.actions}>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate("/forgot-password")}
                        disabled={isLoading}
                    >
                        ¿Olvidaste tu contraseña?
                    </Button>
                </div>

                {authError && (
                    <div className={`${styles.message} ${styles.error}`}>
                        {authError.message || "Error en el inicio de sesión."}
                    </div>
                )}
            </form>
        </div>
    );
};

export default AuthForm;