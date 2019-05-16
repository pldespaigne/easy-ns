import { expect } from 'chai';
import 'mocha';
import { Registry } from './registry';
import { getDefaultProvider } from 'ethers';

let registry: Registry;

describe('Registry', () => {
    before(() => {
        let provider = getDefaultProvider('goerli');
        registry = new Registry(provider);
    });

    it('constructor', () => {
        expect(registry).to.exist;
    });

    it('canSend is false', () => {
        expect(registry.canSend).to.be.false;
    });

    it('owner', async () => {
        const owner = await registry.owner('unit-test.easy-ns.eth');
        expect(owner).to.equal('0x4D7e2f3ab055FC5d484d15aD744310dE98dD5Bc3');
    })
});