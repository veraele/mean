"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConection = void 0;
const mongoose_1 = require("mongoose");
async function startConection() {
    await mongoose_1.connect('mongodb://localhost/gallery-db', {
        useNewUrlParser: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
}
exports.startConection = startConection;
