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
// Internal import
var domain_1 = require("./domain");
var constants_1 = require("./constants");
// import { RootDomain } from './rootDomain'
/**
 * Main class of the Easy-NS library, it contains :
 * - a Signer (for interaction with the Ethtereum Blockchain)
 * - the ENS Registry (the main ENS smart contract)
 * - a cache of all domains queried (it's an array of domains trees)
 */
var ENS = /** @class */ (function () {
    /**
     * The ENS constructor. You should call this function before any use of this library.
     * @param {ethers.Signer} signer : the signer that will be used for all interaction with the Ethereum Blockchain
     * @returns {ENS}
     * @example const ens = new easyns.ENS()
     */
    function ENS(signer) {
        var _this = this;
        // this.userAddress = ''
        // this.registry = new ethers.Contract()
        this.signer = signer;
        this.domains = [];
        this.initialization = new Promise(function (resolve, reject) {
            _this.init().then(function () { return resolve(true); }).catch(function (err) { return reject(err); });
        });
    }
    /**
     * This function will initialize the ENS Registry smart contract (this.registry),
     * and build the begining of the cache (this.domains) by adding all known TLDs of this network.
     */
    ENS.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, net, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.signer.getAddress()];
                    case 1:
                        _a.userAddress = _c.sent();
                        if (!this.signer.provider)
                            throw new Error('The signer has not any providers set');
                        return [4 /*yield*/, this.signer.provider.getNetwork()]; // Retreiving the network from the provider
                    case 2:
                        net = _c.sent() // Retreiving the network from the provider
                        ;
                        if (!net.ensAddress)
                            throw new Error('The network doesn\'t have ens');
                        this.registry = new ethers_1.ethers.Contract(net.ensAddress, constants_1.REGISTRY.ABI, this.signer); // initializing the Registry contract
                        _b = this;
                        return [4 /*yield*/, this.registry.connect(this.signer)];
                    case 3:
                        _b.registry = _c.sent();
                        this.domains.push(new domain_1.Domain('eth', this.registry, this.signer)); // adding 'eth' TLD
                        this.domains.push(new domain_1.Domain('reverse', this.registry, this.signer)); // adding 'eth' TLD
                        // TODO handle other network agnostic TLDs
                        if (net.name === 'ropsten') { // for the Ropsten testnet
                            // this.domains.push(new RootDomain('test', this.registry, this.provider, this.signer))    // adding 'test' TLD
                            this.domains.push(new domain_1.Domain('test', this.registry, this.signer)); // adding 'test' TLD
                            // TODO handle other Ropsten TLDs
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This function will retreive a domain from the cache.
     * It will traverse the domains trees (i.e. cache) and retreive the coresponding domain.
     * If the domain is not in the cache, it will be created and inserted at the right place in the tree.
     * If it's parents domains doesn't exists either, they will also be created.
     * @public
     * @param {string} name : the domain name
     * @returns {Promise<Domain>}
     * @throws this function throws if you try to add a Root Domain
     * @example const domain = await ens.domain('vitalik.eth')
     */
    ENS.prototype.domain = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var nodes, rootName, root;
            return __generator(this, function (_a) {
                nodes = name.split('.') // split name in a array of domain name : 'mywallet.vitalik.eth' -> ['mywallet', 'vitalik', 'eth']
                ;
                rootName = nodes.pop() // get the root domain and remove it from the nodes array: 'eth' and ['mywallet', 'vitalik']
                ;
                if (!rootName)
                    throw new Error('rootName is undefined');
                if (nodes.length == 0) { // it's a root domain
                    throw new Error('adding a root domain is forbiden : ' + name);
                }
                else {
                    root = this.getRoot(rootName) // retreive the good domain tree from the cache
                    ;
                    return [2 /*return*/, root.getDomain(nodes, this.registry, this.signer)]; // continue on that tree
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Retreive a domains tree from the cache.
     * @param {string} name : a TLD (root domain) name
     * @returns {RootDomain} : a Root Domain (TLD) i.e. a tree of domains
     * @throws this function throws if the provided name doesn't exists
     */
    ENS.prototype.getRoot = function (name) {
        for (var _i = 0, _a = this.domains; _i < _a.length; _i++) { // iterate on each RootDomain of the array
            var root = _a[_i];
            if (root.name === name)
                return root; // and check if the names match
        }
        throw new Error('no root domain found for ' + name);
    };
    return ENS;
}());
exports.ENS = ENS;
