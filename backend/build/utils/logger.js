"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerErro = exports.loggerInfo = void 0;
const winston = require('winston');
const loggerInfo = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console()
    ],
});
exports.loggerInfo = loggerInfo;
const loggerErro = winston.createLogger({
    level: 'error', // Registra apenas erros e níveis superiores
    format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
    transports: [
        new winston.transports.File({ filename: 'errors.log' })
    ],
});
exports.loggerErro = loggerErro;
