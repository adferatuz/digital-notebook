export const FORM_FIELDS = {
    EMAIL: 'email',
    TOKEN_ACCESS: 'tokenAccess',
    TERMS: 'terms'
};

export const VALIDATION_RULES = {
    [FORM_FIELDS.EMAIL]: {
        required: true,
        requiredMessage: 'El correo electronico es requerida'
    },
    [FORM_FIELDS.TOKEN_ACCESS]: {
        required: true,
        requiredMessage: 'El token de acceso es requerido',
        pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
        patternMessage: 'El token no tiene un formato válido'
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
    [FORM_FIELDS.EMAIL]: '',
    [FORM_FIELDS.TOKEN_ACCESS]: '',
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