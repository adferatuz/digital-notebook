export const FORM_FIELDS = {
    USERNAME: 'username',
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_PASSWORD: 'confirmPassword',
    TERMS: 'terms'
};

export const VALIDATION_RULES = {
    [FORM_FIELDS.USERNAME]: {
        required: true,
        requiredMessage: 'El username es requerido',
        minLength: 4,
        minLengthMessage: 'El nombre debe tener al menos 4 caracteres'
    },
    [FORM_FIELDS.EMAIL]: {
        required: true,
        requiredMessage: 'El correo electronico es requerida',
        pattern: /^[\w.-]+@miempresa\.com$/, // regex para @miempresa.com
        patternMessage: 'El correo debe terminar en @miempresa.com'
    },
    [FORM_FIELDS.FECHA]: {
        required: true,
        requiredMessage: 'La fecha es requerida'
    },
    [FORM_FIELDS.PASSWORD]: {
        required: true,
        requiredMessage: 'La contraseña es requerido',
        minLength: 10,
        minLengthMessage: 'La contraseña debe tener al menos 10 caracteres',
        pattern: /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
        patternMessage: 'La contraseña debe incluir al menos un carácter especial',
    },
    [FORM_FIELDS.CONFIRM_PASSWORD]: {
        required: true,
        requiredMessage: 'La confirmación de contraseña es requerida',
        matchField: FORM_FIELDS.PASSWORD,
        matchFieldMessage: 'Las contraseñas no coinciden',
    },
    [FORM_FIELDS.TERMS]: {
        required: true,
        requiredMessage: 'Debe aceptar los términos y condiciones',
        custom: (value) => {
            return value ? '' : 'Debe aceptar los términos y condiciones';
        }
    }
};

export const INITIAL_VALUES = {
    [FORM_FIELDS.USERNAME]: '',
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.PASSWORD]: '',
    [FORM_FIELDS.CONFIRM_PASSWORD]: '',
    [FORM_FIELDS.TERMS]: false
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES');
};

export const handleFormSubmission = async (formData) => {
    try {
        // Aquí iría la lógica para enviar los datos al servidor
        console.log('Datos del formulario:', formData);

        // Simular una petición asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            success: true,
            message: 'Formulario enviado correctamente'
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error al enviar el formulario',
            error: error.message || 'Error desconocido'
        };
    }
};