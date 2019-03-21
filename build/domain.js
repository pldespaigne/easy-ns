"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
// External import
var ethers_1 = require("ethers");
var cth = require('content-hash'); // I use require because content-hash is not a TypeScript lib // ! FIND ANOTHER WAY
// Internal import
// import { RootDomain } from './rootDomain'
var constants_1 = require("./constants");
/**
 * The class representing an ENS Domain, it contains 3 level of properties:
 * - level 0 : directly available info
 * - level 1 : info retreived from the Regisrty (1 call to the Blockchain)
 * - level 2 : info retreived from the Resolver (2 call to the Blockchain)
 */
var Domain = /** @class */ (function () {
    /**
     * Constructor of a Domain.
     * @param {string} name : the full domain name : ('vitalik.eth')
     * @param {ethers.Contract} registry : the Registry contract
     * @param {ethers.Signer} signer : the signer
     */
    // constructor(name: string, registry: ethers.Contract, provider: ethers.providers.Web3Provider) {
    function Domain(name, registry, signer) {
        var _this = this;
        this.registry = registry;
        this.name = name;
        this.nodeName = name.split('.')[0]; // get the domain name from the full name : 'mywallet.vitalik.eth' -> 'mywallet'
        this.nodeNameHash = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes(this.nodeName));
        this.namehash = ethers_1.ethers.utils.namehash(this.name);
        this.subdomains = [];
        this.initialization = new Promise(function (resolve, reject) {
            _this.refresh().then(function () { return _this.refreshResolve(signer); }).then(function () { return resolve(true); }).catch(function (err) { return reject(err); });
        });
    }
    /**
     * Get/Refresh the level 1 info of the domain.
     */
    Domain.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.registry.owner(this.namehash)]; // simple call of each read-only methods of the registry
                    case 1:
                        _a.ownerAddress = _d.sent(); // simple call of each read-only methods of the registry
                        _b = this;
                        return [4 /*yield*/, this.registry.resolver(this.namehash)];
                    case 2:
                        _b.resolverAddress = _d.sent();
                        _c = this;
                        return [4 /*yield*/, this.registry.ttl(this.namehash)];
                    case 3:
                        _c.TTL = _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get/Refresh the level 2 info of the domain
     * @param {ethers.Signer} signer : the signer
     */
    // async refreshResolve(provider: ethers.providers.Web3Provider) { // ? more choice of what to refresh : all, only owner, only resolver, both owner and resolver ....
    Domain.prototype.refreshResolve = function (signer) {
        return __awaiter(this, void 0, void 0, function () {
            var resolver, _a, _b, rawContent, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (ethers_1.ethers.utils.bigNumberify(this.resolverAddress).isZero())
                            return [2 /*return*/]; // check if this domain has a resolver set
                        resolver = new ethers_1.ethers.Contract(this.resolverAddress, constants_1.RESOLVER.ABI, signer) // instentiate the resolver
                        ;
                        resolver = resolver.connect(signer);
                        _a = this;
                        return [4 /*yield*/, resolver.name(this.namehash)]; // get the name
                    case 1:
                        _a.resolvedName = _d.sent(); // get the name
                        _b = this;
                        return [4 /*yield*/, resolver.addr(this.namehash)
                            // get the content
                        ]; // get the address
                    case 2:
                        _b.address = _d.sent(); // get the address
                        return [4 /*yield*/, resolver.supportsInterface(constants_1.RESOLVER.HASH.contenthash)];
                    case 3:
                        if (!_d.sent()) return [3 /*break*/, 5];
                        return [4 /*yield*/, resolver.contenthash(this.namehash)]; // get the raw content-hash
                    case 4:
                        rawContent = _d.sent() // get the raw content-hash
                        ;
                        try {
                            this.content = cth.decode(rawContent); // try to decode the content-hash into an IPFS or Swarm hash
                        }
                        catch (err) {
                            console.warn('Unable to decode content-hash : ', err, 'using the raw content hash');
                            this.content = rawContent;
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        console.warn('the resolver of ', this.name, 'is deprecated !');
                        _c = this;
                        return [4 /*yield*/, resolver.content(this.namehash)]; // if the resolver doesn't supports the EIP 1577, get the content
                    case 6:
                        _c.content = _d.sent(); // if the resolver doesn't supports the EIP 1577, get the content
                        _d.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Perform the same as ens.domain(name), but for the local subtree of domains.
     * - check if the current node exist or not, if not create it
     * - if it's the current node is the last, return the current node
     * - if there is more subnode, recursively call this function on the next subnodes
     * @param {string[]} nodes : the array of domain to treat
     * @param {ethers.Contract} registry : the ENS Registry
     * @param {ethers.Signer} signer : the signer
     * @returns {Promise<Domain>} : the retreived/created domain
     * @see ENS.domain()
     */
    Domain.prototype.getDomain = function (nodes, registry, signer) {
        return __awaiter(this, void 0, void 0, function () {
            var nodeName, _i, _a, domain, fullName, newDomain;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nodeName = nodes.pop() // get the current node and reduce the current nodes list
                        ;
                        for (_i = 0, _a = this.subdomains; _i < _a.length; _i++) { // iterate over the subdomains to check if the current node exist
                            domain = _a[_i];
                            if (domain.nodeName === nodeName) {
                                // here the node exist !
                                if (nodes.length == 0) { // if is's the last node simply return it
                                    return [2 /*return*/, domain];
                                }
                                else {
                                    return [2 /*return*/, domain.getDomain(nodes, registry, signer)]; // if there is more subnode, recursivlly call the function
                                }
                            }
                        }
                        fullName = nodeName + '.' + this.name // get the domain name of the node
                        ;
                        newDomain = new Domain(fullName, registry, signer) // instentiation of the domain
                        ;
                        return [4 /*yield*/, newDomain.initialization]; // waiting for the full initialization of the domail (i.e. level 1 & 2 calls)
                    case 1:
                        _b.sent(); // waiting for the full initialization of the domail (i.e. level 1 & 2 calls)
                        this.subdomains.push(newDomain); // we add the new domain as a subdomain of the current one
                        newDomain.parent = this; // we set the parent of the new domain as the current domain
                        if (nodes.length == 0) {
                            return [2 /*return*/, newDomain]; // if it's the end, simply retrun the new domain
                        }
                        else {
                            return [2 /*return*/, newDomain.getDomain(nodes, registry, signer)]; // if not, continue
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Domain.prototype, "rootParent", {
        get: function () {
            if (!this.parent.parent)
                return this.parent;
            else
                return this.parent.rootParent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Domain.prototype, "isOwned", {
        get: function () {
            return !ethers_1.ethers.utils.bigNumberify(this.ownerAddress).eq(0);
        },
        enumerable: true,
        configurable: true
    });
    // async registrarInfo(): Promise<Object> {
    //     const root = this.rootParent
    //     return await root.registrar.info(this.nodeName)
    // }
    Domain.prototype.setResolver = function (resolverAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registry.setResolver(this.namehash, resolverAddress)];
            });
        });
    };
    Domain.prototype.setOwner = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registry.setOwner(this.namehash, address)];
            });
        });
    };
    Domain.prototype.setTtl = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.registry.setTTL(this.namehash, address)];
            });
        });
    };
    Domain.prototype.setSubdomain = function (name, owner) {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                hash = ethers_1.ethers.utils.keccak256(ethers_1.ethers.utils.toUtf8Bytes(name));
                return [2 /*return*/, this.registry.setSubnodeOwner(this.namehash, hash, owner)];
            });
        });
    };
    return Domain;
}());
exports.Domain = Domain;
