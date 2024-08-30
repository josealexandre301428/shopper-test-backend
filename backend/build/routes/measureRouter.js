"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const measures_controller_1 = __importDefault(require("../controller/measures.controller"));
const measureRouter = (0, express_1.Router)();
const control = new measures_controller_1.default();
measureRouter.get('/measures', control.getAllMeasures.bind(control));
measureRouter.post('/upload', control.uploadMeasure);
exports.default = measureRouter;
