"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var constants_1 = require("../utils/constants");
var REGISTRY = __importStar(require("./registry-abi.json"));
var helpers_1 = require("../utils/helpers");
var wraper_contract_1 = require("../utils/wraper-contract");
var Registry = /** @class */ (function (_super) {
    __extends(Registry, _super);
    function Registry(provider) {
        var _this = this;
        var address = constants_1.registryAddress[provider.network.name];
        _this = _super.call(this, address, REGISTRY.abi, provider) || this;
        return _this;
    }
    Registry.prototype.owner = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.owner(ethers_1.utils.namehash(domain))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Registry.prototype.resolver = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.resolver(ethers_1.utils.namehash(domain))];
                    case 1:
                        address = _a.sent();
                        return [2 /*return*/, address];
                }
            });
        });
    };
    Registry.prototype.ttl = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contract.ttl(ethers_1.utils.namehash(domain))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Registry.prototype._requireOwnership = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var owner, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.owner(domain)];
                    case 1:
                        owner = _a.sent();
                        return [4 /*yield*/, this.contract.signer.getAddress()];
                    case 2:
                        address = _a.sent();
                        if (owner !== address) {
                            throw new Error("You cannot perform this action because you are not the owner of " + domain);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Registry.prototype.setOwner = function (domain, newOwner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._requireSending();
                        this._requireOwnership(domain);
                        return [4 /*yield*/, this.contract.setOwner(ethers_1.utils.namehash(domain), newOwner)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Registry.prototype.setResolver = function (domain, address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._requireSending();
                        this._requireOwnership(domain);
                        return [4 /*yield*/, this.contract.setResolver(ethers_1.utils.namehash(domain), address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Registry.prototype.setTtl = function (domain, ttl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._requireSending();
                        this._requireOwnership(domain);
                        return [4 /*yield*/, this.contract.setTTL(ethers_1.utils.namehash(domain), ttl)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Registry.prototype.setSubnodeOwner = function (domain, subdomain, newOner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._requireSending();
                        this._requireOwnership(domain);
                        return [4 /*yield*/, this.contract.setSubnodeOwner(ethers_1.utils.namehash(domain), helpers_1.hash(subdomain), newOner)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Registry;
}(wraper_contract_1.WraperContract));
exports.Registry = Registry;
