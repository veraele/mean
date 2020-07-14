"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const datebase_1 = require("./datebase");
const port = app_1.default.get('port');
async function main() {
    datebase_1.startConection();
    await app_1.default.listen(port);
    console.log('server on port: ', port);
}
main();
