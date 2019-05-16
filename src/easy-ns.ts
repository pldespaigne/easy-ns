
import { getDefaultProvider, providers } from 'ethers';

import { Registry } from './registry/registry';

function fromNetworkName(network: string) {
    const provider = getDefaultProvider(network);
    return new Registry(provider);
}

declare const ethereum: any;
async function fromMetaMask() {
    await ethereum.enable();
    let provider = new providers.Web3Provider(ethereum);

     // this line ensure that the provider is ready before continuing, it's a bit hacky but I didn't find another way
    await provider.getNetwork();
    let registry = new Registry(provider);
    registry.enableSending(provider.getSigner());
    return registry;
}

export {
    Registry,

    fromNetworkName,
    fromMetaMask,
}
