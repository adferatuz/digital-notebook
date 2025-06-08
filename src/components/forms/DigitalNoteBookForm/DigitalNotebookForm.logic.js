export const FORM_FIELDS = {
    EVALUADOR: 'evaluador',
    EDAD: 'edad',
    FECHA: 'fecha',
    CONTENT: 'content',
    TERMS: 'terms'
};

export const VALIDATION_RULES = {
    [FORM_FIELDS.EVALUADOR]: {
        required: true,
        requiredMessage: 'El nombre del evaluador es requerido',
        minLength: 2,
        minLengthMessage: 'El nombre debe tener al menos 2 caracteres'
    },
    [FORM_FIELDS.EDAD]: {
        required: true,
        requiredMessage: 'La edad es requerida',
        pattern: /^\d+$/,
        patternMessage: 'La edad debe ser un número válido',
        custom: (value) => {
            const age = parseInt(value);
            if (age < 0 || age > 120) {
                return 'La edad debe estar entre 0 y 120 años';
            }
            return '';
        }
    },
    [FORM_FIELDS.FECHA]: {
        required: true,
        requiredMessage: 'La fecha es requerida'
    },
    [FORM_FIELDS.CONTENT]: {
        required: true,
        requiredMessage: 'El contenido es requerido',
        minLength: 10,
        minLengthMessage: 'El contenido debe tener al menos 10 caracteres'
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
    [FORM_FIELDS.EVALUADOR]: '',
    [FORM_FIELDS.EDAD]: '',
    [FORM_FIELDS.FECHA]: '',
    [FORM_FIELDS.CONTENT]: '',
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