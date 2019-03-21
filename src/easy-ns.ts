
// External import
import { ethers } from 'ethers'

// Internal import
import { Domain } from './domain'
import { REGISTRY } from './constants'
import { RootDomain } from './rootDomain'

/**
 * Main class of the Easy-NS library, it contains :
 * - a Signer (for interaction with the Ethtereum Blockchain)
 * - the ENS Registry (the main ENS smart contract)
 * - a cache of all domains queried (it's an array of domains trees)
 */

export class ENS {

    userAddress: string
    signer: ethers.Signer
    registry: ethers.Contract
    initialization: Promise<boolean>
    domains: RootDomain[]


    /**
     * The ENS constructor. You should call this function before any use of this library.
     * @param {ethers.Signer} signer : the signer that will be used for all interaction with the Ethereum Blockchain
     * @returns {ENS}
     * @example const ens = new easyns.ENS()
     */
    constructor(signer: ethers.Signer) {
        this.signer = signer
        this.domains = []
        this.initialization = new Promise<boolean>((resolve, reject) => {       // setting a Promise that resolve when the initialization has ended
            this.init().then(() => resolve(true)).catch(err => reject(err))
        })
    }


    /**
     * This function will initialize the ENS Registry smart contract (this.registry),
     * and build the begining of the cache (this.domains) by adding all known TLDs of this network.
     */
    async init() {
        this.userAddress = await this.signer.getAddress()
        const net  = await this.signer.provider.getNetwork()                                               // Retreiving the network from the provider
        this.registry = new ethers.Contract(net.ensAddress, REGISTRY.ABI, this.signer)            // initializing the Registry contract
        this.registry = await this.registry.connect(this.signer)
        this.domains.push(new RootDomain('eth', this.registry, this.signer))         // adding 'eth' TLD
        // TODO handle other network agnostic TLDs

        if (net.name === 'ropsten') {                                                               // for the Ropsten testnet
            // this.domains.push(new RootDomain('test', this.registry, this.provider, this.signer))    // adding 'test' TLD
            this.domains.push(new RootDomain('test', this.registry, this.signer))    // adding 'test' TLD
            // TODO handle other Ropsten TLDs
        }
        // TODO handle other networks
    }


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

    public async domain(name: string): Promise<Domain> {
        const nodes = name.split('.')                                       // split name in a array of domain name : 'mywallet.vitalik.eth' -> ['mywallet', 'vitalik', 'eth']
        const rootName = nodes.pop()                                        // get the root domain and remove it from the nodes array: 'eth' and ['mywallet', 'vitalik']

        if (nodes.length == 0) {                                            // it's a root domain
            throw new Error('adding a root domain is forbiden : ' + name)
        } else {
            const root = this.getRoot(rootName)                             // retreive the good domain tree from the cache
            return root.getDomain(nodes, this.registry, this.signer)      // continue on that tree
        }
    }


    /**
     * Retreive a domains tree from the cache.
     * @param {string} name : a TLD (root domain) name
     * @returns {RootDomain} : a Root Domain (TLD) i.e. a tree of domains
     * @throws this function throws if the provided name doesn't exists
     */

    getRoot(name: string): RootDomain { // ? should this be private ?
        for(let root of this.domains) {             // iterate on each RootDomain of the array
            if (root.name === name) return root     // and check if the names match
        }
        throw new Error('no root domain found for ' + name)
    }
}

// ! NO RELEASE TEST ONLY
export const hello = () => 'hello world !'