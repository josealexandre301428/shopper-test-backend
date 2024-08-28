"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const measures_controller_1 = __importDefault(require("../controller/measures.controller"));
const control = new measures_controller_1.default();
const measureRouter = (0, express_1.Router)();
measureRouter.get('/measures', control.getAllMeasures.bind(control));
exports.default = measureRouter;
