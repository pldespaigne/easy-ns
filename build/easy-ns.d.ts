import { ethers } from 'ethers';
import { Domain } from './domain';
/**
 * Main class of the Easy-NS library, it contains :
 * - a Signer (for interaction with the Ethtereum Blockchain)
 * - the ENS Registry (the main ENS smart contract)
 * - a cache of all domains queried (it's an array of domains trees)
 */
export declare class ENS {
    userAddress: string;
    signer: ethers.Signer;
    registry: ethers.Contract;
    initialization: Promise<boolean>;
    domains: Domain[];
    /**
     * The ENS constructor. You should call this function before any use of this library.
     * @param {ethers.Signer} signer : the signer that will be used for all interaction with the Ethereum Blockchain
     * @returns {ENS}
     * @example const ens = new easyns.ENS()
     */
    constructor(signer: ethers.Signer);
    /**
     * This function will initialize the ENS Registry smart contract (this.registry),
     * and build the begining of the cache (this.domains) by adding all known TLDs of this network.
     */
    init(): Promise<void>;
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
    domain(name: string): Promise<Domain>;
    /**
     * Retreive a domains tree from the cache.
     * @param {string} name : a TLD (root domain) name
     * @returns {RootDomain} : a Root Domain (TLD) i.e. a tree of domains
     * @throws this function throws if the provided name doesn't exists
     */
    getRoot(name: string): Domain;
}
export declare const hello: () => string;
