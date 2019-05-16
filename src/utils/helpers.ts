
import { utils } from 'ethers';

export function hash(message: string) {
    return utils.keccak256(utils.toUtf8Bytes(message));
}