import { Contract, providers, Signer } from "ethers";
export declare class WraperContract {
    protected contract: Contract;
    canSend: boolean;
    constructor(address: string, abi: any, provider: providers.BaseProvider);
    enableSending(signer: Signer): void;
    protected _requireSending(): void;
}
