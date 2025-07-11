import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import FormHeader from "../FormHeader/FormHeader";
import Button from "../../ui/Button/Button";
import Checkbox from "../../ui/Checkbox/Checkbox";
import Input from "../../ui/Input/Input";
import { useForm } from "../../../hooks/useForm";
import { useEdahForm } from "../../../hooks/useEdahForm";

import styles from "./CredentialsForm.module.css";

// --- Temporary constants until a proper hook is created ---
const FORM_FIELDS = {
    TEST_ID: 'testId',
    CREDENTIAL: 'credential',
    TERMS: 'terms',
};

const INITIAL_VALUES = {
    [FORM_FIELDS.TEST_ID]: '',
    [FORM_FIELDS.CREDENTIAL]: '',
    [FORM_FIELDS.TERMS]: false,
};

const VALIDATION_RULES = {
    [FORM_FIELDS.TEST_ID]: { required: true },
    [FORM_FIELDS.CREDENTIAL]: { required: true },
    [FORM_FIELDS.TERMS]: { required: true },
};
// --- End of temporary constants ---

const CredentialsForm = ({onClose}) => {
    const navigate = useNavigate();
    const { isLoading, error, validate } = useEdahForm();

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

        const { testId, credential } = values;

        

        const result = await validate(testId, credential);

        if (result.isValid) {
            navigate(`/edah-form?testId=${testId}`);
        } else {
            // Error handling is done by useEdahForm hook, but we can show a generic message here if needed
            console.error("Validation failed:", error);
        }
    };

    const handleReset = () => {
        resetForm();
    };

    return (
        <div className={styles.container}>
            <FormHeader
                title="Acceso a la Prueba EDAH"
                subtitle="Ingresa el ID de la prueba y la credencial que te proporcionaron para continuar."
                onClose={onClose}
            />

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formFields}>
                    <div className={styles.row}>
                        <Input
                            label="ID de la Prueba"
                            name={FORM_FIELDS.TEST_ID}
                            type="text"
                            value={values[FORM_FIELDS.TEST_ID]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors[FORM_FIELDS.TEST_ID]}
                            placeholder="Ej: EDAH-123456789"
                        />
                        <Input
                            label="Credencial de Acceso"
                            name={FORM_FIELDS.CREDENTIAL}
                            type="text"
                            value={values[FORM_FIELDS.CREDENTIAL]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors[FORM_FIELDS.CREDENTIAL]}
                            placeholder="Ingresa tu credencial de acceso"
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
                        disabled={isLoading}
                    >
                        {isLoading ? 'Validando...' : 'Validar'}
                    </Button>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleReset}
                        disabled={isLoading}
                    >
                        Limpiar formulario
                    </Button>
                </div>

                {error && (
                    <div className={`${styles.message} ${styles.error}`}>
                        Error: {error.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CredentialsForm;