import { providers } from "ethers";

import { WraperContract } from "../utils/wraper-contract";
import * as RESOLVER from './resolver-abi.json';

export class Resolver extends WraperContract{
    
    constructor(address: string, provider: providers.BaseProvider) {
        super(address, RESOLVER.abi, provider);
    }
}