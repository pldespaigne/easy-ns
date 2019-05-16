"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
function hash(message) {
    return ethers_1.utils.keccak256(ethers_1.utils.toUtf8Bytes(message));
}
exports.hash = hash;
