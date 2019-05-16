"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var WraperContract = /** @class */ (function () {
    function WraperContract(address, abi, provider) {
        this.contract = new ethers_1.Contract(address, abi, provider);
        this.canSend = false;
    }
    WraperContract.prototype.enableSending = function (signer) {
        this.contract = this.contract.connect(signer);
        this.canSend = true;
    };
    WraperContract.prototype._requireSending = function () {
        if (!this.canSend) {
            throw new Error('This Registry cannot send transaction ! Please call "enableSending()" before !');
        }
    };
    return WraperContract;
}());
exports.WraperContract = WraperContract;
