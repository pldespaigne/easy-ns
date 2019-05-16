import { Contract, providers, Signer } from "ethers";

export class WraperContract {
    protected contract: Contract;

    canSend: boolean;
    
    constructor(address: string, abi: any, provider: providers.BaseProvider) {
        this.contract = new Contract(address, abi, provider);
        this.canSend = false;
    }

    enableSending(signer: Signer) {
        this.contract =  this.contract.connect(signer);
        this.canSend = true;
    }

    protected _requireSending() {
        if (!this.canSend) {
            throw new Error('This Registry cannot send transaction ! Please call "enableSending()" before !');
        }
    }
}