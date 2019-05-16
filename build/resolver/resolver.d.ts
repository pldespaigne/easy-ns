import { providers } from "ethers";
import { WraperContract } from "../utils/wraper-contract";
export declare class Resolver extends WraperContract {
    constructor(address: string, provider: providers.BaseProvider);
}
