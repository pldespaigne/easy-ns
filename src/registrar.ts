
import { ethers } from 'ethers'

import { REGISTRAR } from './constants'

enum RegistrarTypes { FIFS, AUCTION }

enum AuctionState {AVAILABLE, STARTED, OWNED, FORBIDDEN, REVEAL, AVAILABLE_SOON}

function sha3(value: string): string {
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(value))
}

interface RegistrarInfos { // return (state(_hash), address(h.deed), h.registrationDate, h.value, h.highestBid);
    expiryTimes: Date,
    state: AuctionState,
    deed: string,
    registrationDate: Date,
    
}

export class Registrar { // ! DO NOT USE THIS !!!!! CREATE ONE CLASS BY REGISTRAR TYPE INSTEAD !

    contract: ethers.Contract
    type: RegistrarTypes
    userAddress: ethers.Signer

    constructor(address: string, rootName: string, provider: ethers.providers.Provider, signer?: ethers.Signer) {

        // if (signer) this.signer = signer

        switch (rootName) {
            case 'eth':
                this.type = RegistrarTypes.AUCTION
                this.contract = new ethers.Contract(address, REGISTRAR.AUCTION, provider)
                break;
            case 'test':
                this.type = RegistrarTypes.FIFS
                this.contract = new ethers.Contract(address, REGISTRAR.FIFS, provider)
                break;
            // TODO REVERSE REGISTRAR
            // TODO other REGISTRAR such as .xyz, .luxe, ...
            default:
                throw new Error('unknown TLD : ' + rootName)
        }
    }

    async info(nodeName: string): Promise<Object> {

        const hash = sha3(nodeName)

        if (this.type === RegistrarTypes.FIFS) return await this.contract.expiryTimes(hash) // TODO return a RegistrarInfos instead
        else if (this.type === RegistrarTypes.AUCTION) return await this.contract.entries(hash) // TODO return a RegistrarInfos instead

        return hash

    }

    // async register(nodeName: string): Promise<Object> {
        // if (!this.signer) throw new Error('No signer available')
        // const hash = sha3(nodeName)
        // return await this.contract.register(hash, await this.signer.getAddress())
    // }
}