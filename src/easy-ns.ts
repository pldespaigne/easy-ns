
// External import
import { ethers } from 'ethers'

// Internal import
import { Domain } from './domain'
import { REGISTRY } from './constants'
import { RootDomain } from './rootDomain'

/**
 * Main class of the Easy-NS library, it contains :
 * - the Web 3 Provider (for interaction with the Ethtereum Blockchain)
 * - the ENS Registry (the main ENS smart contract)
 * - a cache of all domains queried (it's an array of domains trees)
 */

export class ENS {

    provider: ethers.providers.Web3Provider // ! change this for a signer
    // signer: ethers.Signer // TODO signer contains a provider and is the most abstract and agnostic things to use !!!! wallet extends signer
    registry: ethers.Contract
    initialization: Promise<boolean>
    domains: RootDomain[]


    /**
     * The ENS constructor. You should call this function before any use of this library.
     * @param {ethers.providers.Provider} provider : a Web 3 provider that will be used for all interaction with the Ethereum Blockchain, if not specified, ethers's default provider for Ropsten will be used
     * @returns {ENS}
     * @example const ens = new easyns.ENS()
     */

    // constructor(provider: ethers.providers.Provider = ethers.getDefaultProvider('ropsten')){//, signer?: ethers.Signer) {
    constructor(provider: ethers.providers.Web3Provider){//, signer?: ethers.Signer) {
        this.provider = provider
        // this.signer = signer // ! SIGNER ???
        // if (signer) console.log('signe', signer)
        // console.log('this', this.signer)
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
        const net  = await this.provider.getNetwork()                                               // Retreiving the network from the provider
        this.registry = new ethers.Contract(net.ensAddress, REGISTRY.ABI, this.provider)            // initializing the Registry contract
        this.registry = await this.registry.connect(this.provider.getSigner())
        // this.registry.connect(this.signer) // ! SIGNER ???
        // console.log('DEBUG', this.signer, this.registry) // ! SIGNER ??
        
        // this.domains.push(new RootDomain('eth', this.registry, this.provider, this.signer))         // adding 'eth' TLD  // ! SIGNER ???
        this.domains.push(new RootDomain('eth', this.registry, this.provider))         // adding 'eth' TLD  // ! SIGNER ???
        // TODO handle other network agnostic TLDs

        if (net.name === 'ropsten') {                                                               // for the Ropsten testnet
            // this.domains.push(new RootDomain('test', this.registry, this.provider, this.signer))    // adding 'test' TLD // ! SIGNER ???
            this.domains.push(new RootDomain('test', this.registry, this.provider))    // adding 'test' TLD
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
            return root.getDomain(nodes, this.registry, this.provider)      // continue on that tree
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