export declare const RESOLVER: {
    HASH: {
        abi: string;
        addr: string;
        name: string;
        text: string;
        pubkey: string;
        content: string;
        interfaces: string;
        contenthash: string;
    };
    ABI: ({
        constant: boolean;
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "name": string;
        "outputs": any[];
        "payable": boolean;
        "stateMutability": string;
        "type": string;
        "anonymous"?: undefined;
    } | {
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "stateMutability": string;
        "type": string;
        constant?: undefined;
        "name"?: undefined;
        "outputs"?: undefined;
        "anonymous"?: undefined;
    } | {
        "anonymous": boolean;
        "inputs": {
            "indexed": boolean;
            "name": string;
            "type": string;
        }[];
        "name": string;
        "type": string;
        constant?: undefined;
        "outputs"?: undefined;
        "payable"?: undefined;
        "stateMutability"?: undefined;
    })[];
};
export declare const REGISTRY: {
    ADDRESS: {
        MAINNET: string;
        ROPSTEN: string;
        RINKEBY: string;
    };
    ABI: ({
        "constant": boolean;
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "name": string;
        "outputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "type": string;
        "anonymous"?: undefined;
    } | {
        "anonymous": boolean;
        "inputs": {
            "indexed": boolean;
            "name": string;
            "type": string;
        }[];
        "name": string;
        "type": string;
        constant?: undefined;
        "outputs"?: undefined;
        "payable"?: undefined;
    })[];
};
export declare const REGISTRAR: {
    AUCTION: ({
        "constant": boolean;
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "name": string;
        "outputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "type": string;
        "anonymous"?: undefined;
    } | {
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "type": string;
        constant?: undefined;
        "name"?: undefined;
        "outputs"?: undefined;
        "anonymous"?: undefined;
    } | {
        "anonymous": boolean;
        "inputs": {
            "indexed": boolean;
            "name": string;
            "type": string;
        }[];
        "name": string;
        "type": string;
        constant?: undefined;
        "outputs"?: undefined;
        "payable"?: undefined;
    })[];
    FIFS: ({
        "constant": boolean;
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "name": string;
        "outputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "type": string;
    } | {
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "type": string;
        constant?: undefined;
        "name"?: undefined;
        "outputs"?: undefined;
        "payable"?: undefined;
    })[];
    REVERSE: ({
        "constant": boolean;
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "name": string;
        "outputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "stateMutability": string;
        "type": string;
    } | {
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "stateMutability": string;
        "type": string;
        constant?: undefined;
        "name"?: undefined;
        "outputs"?: undefined;
    })[];
};
export declare const DEED: {
    ABI: ({
        "constant": boolean;
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "name": string;
        "outputs": any[];
        "payable": boolean;
        "stateMutability": string;
        "type": string;
        "anonymous"?: undefined;
    } | {
        "inputs": {
            "name": string;
            "type": string;
        }[];
        "payable": boolean;
        "stateMutability": string;
        "type": string;
        constant?: undefined;
        "name"?: undefined;
        "outputs"?: undefined;
        "anonymous"?: undefined;
    } | {
        "anonymous": boolean;
        "inputs": {
            "indexed": boolean;
            "name": string;
            "type": string;
        }[];
        "name": string;
        "type": string;
        constant?: undefined;
        "outputs"?: undefined;
        "payable"?: undefined;
        "stateMutability"?: undefined;
    })[];
};
