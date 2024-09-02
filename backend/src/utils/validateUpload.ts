import { isBase64, isString } from 'class-validator';

//Validar o tipo de dados dos parâmetros enviados (inclusive o base64)


const validateUpload = (upload: any) => {
    const { image, customer_code, measure_type } = upload;
    const errors: string[] = [];

    if (!isBase64(image)) {
        errors.push('Image must be in base64 format');
    }

    if (!isString(customer_code)) {
        errors.push('Customer code must be a string');
    }

    if (!/^WATER|GAS$/.test(measure_type)) {
        errors.push('Measure type must be "WATER" or "GAS"');
    }

    if (errors.length > 0) {
        return {
            status: 400,
            error_code: 'INVALID DATA',
            error_description: errors
        };
    }

    return {
        status: 200,
        message: 'Validation passed'
    };
};

export default {
    validateUpload
};
