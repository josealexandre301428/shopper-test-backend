"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
//Validar o tipo de dados dos parâmetros enviados (inclusive o base64)
const validateUpload = (upload) => {
    const { image, customer_code, measure_type } = upload;
    const errors = [];
    if (!(0, class_validator_1.isBase64)(image)) {
        errors.push('Image must be in base64 format');
    }
    if (!(0, class_validator_1.isString)(customer_code)) {
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
exports.default = {
    validateUpload
};
