import { ethers } from 'ethers';
import { BigNumber } from 'ethers/utils';
import { TransactionResponse } from 'ethers/providers';
/**
 * The class representing an ENS Domain, it contains 3 level of properties:
 * - level 0 : directly available info
 * - level 1 : info retreived from the Regisrty (1 call to the Blockchain)
 * - level 2 : info retreived from the Resolver (2 call to the Blockchain)
 */
export declare class Domain {
    registry: ethers.Contract;
    nodeName: string;
    nodeNameHash: string;
    name: string;
    namehash: string;
    parent: Domain;
    subdomains: Domain[];
    initialization: Promise<boolean>;
    ownerAddress: string;
    resolverAddress: string;
    TTL: BigNumber;
    resolvedName: string;
    content: string;
    address: string;
    /**
     * Constructor of a Domain.
     * @param {string} name : the full domain name : ('vitalik.eth')
     * @param {ethers.Contract} registry : the Registry contract
     * @param {ethers.Signer} signer : the signer
     */
    constructor(name: string, registry: ethers.Contract, signer: ethers.Signer);
    /**
     * Get/Refresh the level 1 info of the domain.
     */
    refresh(): Promise<void>;
    /**
     * Get/Refresh the level 2 info of the domain
     * @param {ethers.Signer} signer : the signer
     */
    refreshResolve(signer: ethers.Signer): Promise<void>;
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
    getDomain(nodes: string[], registry: ethers.Contract, signer: ethers.Signer): Promise<Domain>;
    readonly rootParent: Domain;
    readonly isOwned: boolean;
    setResolver(resolverAddress: string): Promise<TransactionResponse>;
    setOwner(address: string): Promise<TransactionResponse>;
    setTtl(address: string): Promise<TransactionResponse>;
    setSubdomain(name: string, owner: string): Promise<TransactionResponse>;
}
