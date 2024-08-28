"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customers_controller_1 = __importDefault(require("../controller/customers.controller"));
const control = new customers_controller_1.default();
const customersRouter = (0, express_1.Router)();
customersRouter.get('/customers', control.getAllMeasures.bind(control));
exports.default = customersRouter;
