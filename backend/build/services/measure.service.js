"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Measures_1 = __importDefault(require("../database/models/Measures"));
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const resp_1 = __importDefault(require("../utils/resp"));
require("dotenv/config");
class MeasureServices {
    constructor() {
        this.model = Measures_1.default;
    }
    getAllMeasures() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const measures = yield this.model.findAll();
                return (0, resp_1.default)(200, measures);
            }
            catch (error) {
                console.error('Error fetching measures:', error);
                return (0, resp_1.default)(500, { error: { error_code: 'INTERNAL_ERROR', error_description: 'An error occurred while fetching measures' } });
            }
        });
    }
    uploadMeasure(image, customer_code, measure_type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingMeasure = yield this.model.findOne({
                    where: {
                        customerCode: customer_code,
                    }
                });
                // if (existingMeasure) {
                //   return {
                //       status: 409,
                //       error_code: 'DOUBLE_REPORT',
                //       error_description: 'Leitura do mês já realizada'
                //   };
                // }
                // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
                // const result = await model.generateContent([
                // "Quais numeros estao na imagem?",
                // {inlineData: {data: image, mimeType: 'image/jpeg'}}]
                // );
                // const measureCreate = await this.model.create({
                //   customerCode: customer_code,
                //   measureUuid: uuid(),
                //   measureDatetime: new DATE,
                //   measureValue: Math.round(result.text),
                //   measureType: measure_type,
                //   hasConfirmed: false,
                //   imageUrl: result.url
                return existingMeasure;
            }
            catch (error) {
                return {
                    status: 500,
                    error_code: 'INTERNAL_ERROR',
                    error_description: 'Ocorreu um erro ao processar a medida.'
                };
            }
            ;
        });
    }
}
exports.default = MeasureServices;
