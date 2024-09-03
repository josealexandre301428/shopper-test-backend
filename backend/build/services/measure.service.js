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
require('dotenv/config');
const Measures_1 = __importDefault(require("../database/models/Measures"));
const validateUpload_1 = __importDefault(require("../utils/validateUpload"));
const generative_ai_1 = require("@google/generative-ai");
const resp_1 = __importDefault(require("../utils/resp"));
class MeasureServices {
    constructor() {
        this.model = Measures_1.default;
    }
    extractNumbers(base64Image, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const genAI = new generative_ai_1.GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });
            const result = yield model.generateContent([
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: "image/jpeg"
                    }
                },
                { text: "Describe what numbers are in the image" },
            ]);
            return result.response;
        });
    }
    getAllMeasures() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const measures = yield this.model.findAll();
                return (0, resp_1.default)(200, { measures: measures });
            }
            catch (error) {
                console.error('Error fetching measures:', error);
                return (0, resp_1.default)(500, { error: { error_code: 'INTERNAL_ERROR', error_description: 'An error occurred while fetching measures' } });
            }
        });
    }
    uploadMeasure(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { image, customer_code, measure_type } = req;
            try {
                const validationErrors = validateUpload_1.default.validateUpload({ image, customer_code, measure_type });
                if (validationErrors.status == 400) {
                    return (0, resp_1.default)(400, { errors: validationErrors.error_description });
                }
                const measuring = yield this.extractNumbers(image, process.env.GOOGLE_CLOUD_PROJECT);
                return measuring;
            }
            catch (error) {
                return (`Erro ao realizar o upload da medida:${error}`);
            }
        });
    }
}
exports.default = MeasureServices;
