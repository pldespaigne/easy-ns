
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
    let network = await provider.getNetwork()
    provider.network = network;
    let registry = new Registry(provider);
    registry.enableSending(provider.getSigner());
    return registry;
}

export {
    Registry,

    fromNetworkName,
    fromMetaMask,
}
