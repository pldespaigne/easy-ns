import { ethers } from 'ethers';
declare enum RegistrarTypes {
    FIFS = 0,
    AUCTION = 1
}
export declare class Registrar {
    contract: ethers.Contract;
    type: RegistrarTypes;
    userAddress: ethers.Signer;
    constructor(address: string, rootName: string, signer: ethers.Signer);
    info(nodeName: string): Promise<Object>;
}
export {};
