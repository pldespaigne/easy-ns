
// External import
import { ethers } from 'ethers';

// Internal import
import { Domain } from './domain'
import { Registrar } from './registrar';

/**
 * This class represent a Root Domain, it's also a tree of domains, it contains :
 * - the Registrar smart contract to register new Domains onto the Blockchain
 * @extends {Domain}
 */
export class RootDomain extends Domain {
    
    // registrar: Registrar

    /**
     * Constructor for a Root Domain.
     * @param {string} name : the Root Domain names ('eth', 'test', ....)
     * @param {ethers.Contract} registry : the main ENS registry
     * @param {ethers.Signer} signer : the signer
     */
    constructor(name: string, registry: ethers.Contract, signer: ethers.Signer) {
        super(name, registry, signer) // call the suer constructor
        this.parent = null // a root domain has no parent // ? is it a good idea to set it to null
        // this.initialization.then(() => this.setRegistrar(provider, signer)) // wait for super.refresh because we need ownerAddress in setRegistrar function
    }

    /**
     * This function will build the good Registrar according to the root name : ('eth' -> auction registrar, 'test' -> fifs registrar)
     * @param provider : a Web 3 provider
     */
    // async setRegistrar(provider: ethers.providers.Provider, signer?: ethers.Signer) {  // ? needed, could have been in Domain ?

    //     this.registrar = new Registrar(this.ownerAddress, this.name, provider, signer)
    // }

    
}