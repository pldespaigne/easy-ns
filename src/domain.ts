
// External import
import { ethers, constants } from 'ethers'
import { BigNumber } from 'ethers/utils'
const cth = require('content-hash') // I use require because content-hash is not a TypeScript lib // ! FIND ANOTHER WAY

// Internal import
// import { RootDomain } from './rootDomain'
import { RESOLVER } from './constants'
import { TransactionResponse } from 'ethers/providers';

/**
 * The class representing an ENS Domain, it contains 3 level of properties:
 * - level 0 : directly available info
 * - level 1 : info retreived from the Regisrty (1 call to the Blockchain)
 * - level 2 : info retreived from the Resolver (2 call to the Blockchain)
 */
export class Domain{
    
    // LEVEL 0
    registry: ethers.Contract
    nodeName: string
    nodeNameHash: string
    name: string
    namehash: string
    parent: Domain
    subdomains: Domain[]
    initialization: Promise<boolean>

    // LEVEL 1 : info from the ENS registry
    ownerAddress: string
    resolverAddress: string
    TTL: BigNumber
    resolver: ethers.Contract
    
    // LEVEL 2 : info from the Resolver at this.resolverAddress (level 1)
    resolvedName: string
    content: string
    address: string

    /**
     * Constructor of a Domain.
     * @param {string} name : the full domain name : ('vitalik.eth')
     * @param {ethers.Contract} registry : the Registry contract
     * @param {ethers.Signer} signer : the signer
     */
    // constructor(name: string, registry: ethers.Contract, provider: ethers.providers.Web3Provider) {
    constructor(name: string, registry: ethers.Contract, signer: ethers.Signer) {
        this.registry = registry
        this.name = name
        this.nodeName = name.split('.')[0] // get the domain name from the full name : 'mywallet.vitalik.eth' -> 'mywallet'
        this.nodeNameHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(this.nodeName))
        this.namehash = ethers.utils.namehash(this.name)
        this.subdomains = []
        this.initialization = new Promise<boolean>((resolve, reject) => {
            this.refresh().then(() => {
                if (!ethers.utils.bigNumberify(this.ownerAddress).eq(0)) this.refreshResolve(signer)
            }).then(() =>
                resolve(true)
            ).catch(err =>
                reject(err)
            )
        });
    }

    /**
     * Get/Refresh the level 1 info of the domain.
     */
    async refresh() { // ? more choice of what to refresh : all, only owner, only resolver, both owner and resolver ....
        this.ownerAddress = await this.registry.owner(this.namehash) // simple call of each read-only methods of the registry
        this.resolverAddress = await this.registry.resolver(this.namehash)
        this.TTL = await this.registry.ttl(this.namehash)
    }

    /**
     * Get/Refresh the level 2 info of the domain
     * @param {ethers.Signer} signer : the signer
     */
    async refreshResolve(signer?: ethers.Signer) { // ? more choice of what to refresh : all, only owner, only resolver, both owner and resolver ....
        
        if (!signer && !this.resolver) throw new Error('refreshResolve() needs either a signer or a resolver to be set')
        else if (!signer) signer = this.resolver.signer

        if (ethers.utils.bigNumberify(this.resolverAddress).isZero()) return // check if this domain has a resolver set

        this.resolver = new ethers.Contract(this.resolverAddress, RESOLVER.ABI, signer) // instentiate the resolver
        this.resolvedName = await this.resolver.name(this.namehash) // get the name
        this.address = await this.resolver.addr(this.namehash) // get the address

        // get the content
        if (await this.resolver.supportsInterface(RESOLVER.HASH.contenthash)) { // check if the resolver is EIP1577 compliant
            const rawContent = await this.resolver.contenthash(this.namehash) // get the raw content-hash
            try {
                this.content = cth.decode(rawContent) // try to decode the content-hash into an IPFS or Swarm hash
            } catch(err) {
                console.warn('Unable to decode content-hash : ', err, 'using the raw content hash')
                this.content = rawContent
            }
        } else {
            console.warn('the resolver of ', this.name, 'is deprecated !')
            this.content = await this.resolver.content(this.namehash) // if the resolver doesn't supports the EIP 1577, get the content
        }
    }

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
    async getDomain(nodes: string[], registry: ethers.Contract, signer: ethers.Signer): Promise<Domain> {
        
        // EXAMPLE of the 'eth' domain tree
        //
        //               mywallet
        //              /
        //      vitalik
        //     /        \
        //  eth          blog
        //     \
        //      cryptokitty
        //
        // (1) mywallet.vitalik.eth : get eth, get vitalik, get mywallet, end, return mywallet
        // (2) vladzamfir.eth : get eth, get vladzamfir - not found - create it, end, return vladzamfir
        // (3) unicorn.zombie.cryptokitty.eth : get eth, get cryptokitty, get zombie - not found - create it, get unicorn - not found - create it, end, return unicorn
        //
        //               mywallet (1)
        //              /
        //      vitalik               unicorn (3)
        //     /       \             /
        //  eth        blog    zombie
        //    |\              /
        //    | `- cryptokitty
        //    \
        //     vladzamfir (2)

        const nodeName = nodes.pop() // get the current node and reduce the current nodes list
        
        for (let domain of this.subdomains) { // iterate over the subdomains to check if the current node exist
            if (domain.nodeName === nodeName){
                // here the node exist !
                if (nodes.length == 0) { // if is's the last node simply return it
                    return domain
                } else {
                    return domain.getDomain(nodes, registry, signer) // if there is more subnode, recursivlly call the function
                }
            }
        }

        // here the node does not exist yet
        const fullName = nodeName + '.' + this.name // get the domain name of the node
        let newDomain = new Domain(fullName, registry, signer) // instentiation of the domain
        await newDomain.initialization // waiting for the full initialization of the domail (i.e. level 1 & 2 calls)
        this.subdomains.push(newDomain) // we add the new domain as a subdomain of the current one
        newDomain.parent = this // we set the parent of the new domain as the current domain
        
        if (nodes.length == 0) {
            return newDomain // if it's the end, simply retrun the new domain
        } else {
            return newDomain.getDomain(nodes, registry, signer) // if not, continue
        }
    }

    get rootParent(): Domain {
        if (!this.parent.parent) return this.parent
        else return this.parent.rootParent
    }

    get isOwned(): boolean {
        return !ethers.utils.bigNumberify(this.ownerAddress).eq(0)
    }

    // async registrarInfo(): Promise<Object> {
    //     const root = this.rootParent
    //     return await root.registrar.info(this.nodeName)
    // }

    // LEVEL 1 : ENS registry function
    setResolver(resolverAddress: string): Promise<TransactionResponse> {
        return this.registry.setResolver(this.namehash, resolverAddress)
    }

    setOwner(address: string): Promise<TransactionResponse> {
        return this.registry.setOwner(this.namehash, address)
    }

    setTtl(address: string): Promise<TransactionResponse> {
        return this.registry.setTTL(this.namehash, address)
    }

    setSubdomain(name: string, owner: string): Promise<TransactionResponse> { // TODO set new subdomain as child of the current domain
        const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(name))
        return this.registry.setSubnodeOwner(this.namehash, hash, owner)
    }

    // LEVEL 2 : Resolver functin at this.resolverAddress (level 1)
    setName(name: string): Promise<TransactionResponse> {
        return this.resolver.setName(this.namehash, name)
    }

    setContent(type: string, content: string): Promise<TransactionResponse> {
        let contentHash
        switch(type) {
            case 'ipfs':
                contentHash = cth.fromIpfs(content)
                break
            case 'swarm':
                contentHash = cth.fromSwarm(content)
                break
            default:
                throw new Error('invalid type, type must be \'ipfs\' or \'swarm\'')
        }
        return this.resolver.setContenthash(this.namehash, '0x' + contentHash)
    }

    setAddress(address: string): Promise<TransactionResponse> {
        return this.resolver.setAddr(this.namehash, address)
    }
}