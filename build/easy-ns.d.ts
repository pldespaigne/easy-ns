import { Registry } from './registry/registry';
declare function fromNetworkName(network: string): Registry;
declare function fromMetaMask(): Promise<Registry>;
export { Registry, fromNetworkName, fromMetaMask, };
