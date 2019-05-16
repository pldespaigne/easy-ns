import { providers } from 'ethers';
import { WraperContract } from '../utils/wraper-contract';
export declare class Registry extends WraperContract {
    constructor(provider: providers.BaseProvider);
    owner(domain: string): Promise<any>;
    resolver(domain: string): Promise<any>;
    ttl(domain: string): Promise<any>;
    private _requireOwnership;
    setOwner(domain: string, newOwner: string): Promise<providers.TransactionResponse>;
    setResolver(domain: string, address: string): Promise<providers.TransactionResponse>;
    setTtl(domain: string, ttl: number): Promise<providers.TransactionResponse>;
    setSubnodeOwner(domain: string, subdomain: string, newOner: string): Promise<providers.TransactionResponse>;
}
