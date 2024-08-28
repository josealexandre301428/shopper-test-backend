"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const measureRouter_1 = __importDefault(require("./measureRouter"));
const customersRouter_1 = __importDefault(require("./customersRouter"));
const router = (0, express_1.Router)();
router.use(measureRouter_1.default);
router.use(customersRouter_1.default);
exports.default = router;
