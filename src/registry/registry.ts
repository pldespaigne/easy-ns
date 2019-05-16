import { providers, utils } from 'ethers';

import { registryAddress } from '../utils/constants';
import * as REGISTRY from './registry-abi.json';
import { hash } from '../utils/helpers';
import { WraperContract } from '../utils/wraper-contract';

export class Registry extends WraperContract {


    constructor(provider: providers.BaseProvider) {
        const address = registryAddress[provider.network.name];
        super(address, REGISTRY.abi, provider);
    }

    async owner(domain: string) {
        return await this.contract.owner(utils.namehash(domain));
    }

    async resolver(domain: string) {
        const address = await this.contract.resolver(utils.namehash(domain));
        return address;
    }

    async ttl(domain: string) {
        return await this.contract.ttl(utils.namehash(domain));
    }

    private async _requireOwnership(domain: string) {
        const owner = await this.owner(domain);
        const address = await this.contract.signer.getAddress();
        if (owner !== address) {
            throw new Error(`You cannot perform this action because you are not the owner of ${domain}`);
        }
    }

    async setOwner(domain: string, newOwner: string): Promise<providers.TransactionResponse> {
        this._requireSending();
        this._requireOwnership(domain);
        return await this.contract.setOwner(utils.namehash(domain), newOwner);
    }

    async setResolver(domain: string, address: string): Promise<providers.TransactionResponse> {
        this._requireSending();
        this._requireOwnership(domain);
        return await this.contract.setResolver(utils.namehash(domain), address);
    }

    async setTtl(domain: string, ttl: number): Promise<providers.TransactionResponse> {
        this._requireSending();
        this._requireOwnership(domain);
        return await this.contract.setTTL(utils.namehash(domain), ttl);
    }

    async setSubnodeOwner(domain: string, subdomain: string, newOner: string): Promise<providers.TransactionResponse> {
        this._requireSending();
        this._requireOwnership(domain);
        return await this.contract.setSubnodeOwner(utils.namehash(domain), hash(subdomain), newOner);
    }
}