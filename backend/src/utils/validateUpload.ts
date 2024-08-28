import { isBase64, isString, isDate } from 'class-validator';

//Validar o tipo de dados dos parâmetros enviados (inclusive o base64)


const validateUpload = (upload: any, measures: any) => {
    const { image, customer_code, measure_datetime, measure_type } = upload;
    const errors: string[] = [];

    if(measures == null || measures == undefined) measures = [];

    const existingMeasure = measures.find((measure: any) => measure.customer_code === customer_code &&
    new Date(measure.measure_datetime).toISOString() === new Date(measure_datetime).toISOString());
    
    if (existingMeasure) {
        return {
            status: 409,
            error_code: 'DOUBLE REPORT',
            error_description: 'Leitura do mês já realizada'
        };
    }

    if (!isBase64(image)) {
        errors.push('Image must be in base64 format');
    }

    if (!isString(customer_code)) {
        errors.push('Customer code must be a string');
    }

    if (!isDate(measure_datetime)) {
        errors.push('Measure datetime must be a valid date');
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
