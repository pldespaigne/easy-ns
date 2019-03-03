


    /////////////////////////////////////////////////////////////////////////////
    //								RESOLVER
    /////////////////////////////////////////////////////////////////////////////
    export const RESOLVER = {
    // interface signature of known getters
        HASH: {
            abi:			"0x2203ab56", // use for storing a contract abi encoded (or not) : https://eips.ethereum.org/EIPS/eip-205
            addr:			"0x3b3b57de", // address of a smart contract : https://eips.ethereum.org/EIPS/eip-137
            name:			"0x691f3431", // use for reverse ens lookup : https://eips.ethereum.org/EIPS/eip-181
            text:			"0x59d1d43c", // keys - values storage : https://eips.ethereum.org/EIPS/eip-634
            pubkey:			"0xc8690233", // secp256k1 public key : https://github.com/ethereum/EIPs/pull/619/files
            content:		"0xd8389dc5", // DEPRECATED swarm hash : http://docs.ens.domains/en/latest/implementers.html?highlight=content#writing-a-resolver
        //     // multihash:		"0xe89401a1", // DEPRECATED ipfs hash : https://eips.ethereum.org/EIPS/eip-1062
            interfaces:		"0x01ffc9a7", // chack supported function : https://eips.ethereum.org/EIPS/eip-137
            contenthash:	"0xbc1c58d1", // store content hash (swarm, ipfs, ...) : https://eips.ethereum.org/EIPS/eip-1577
        },
        ABI: [
            {
                "constant":true,
                "inputs":[{"name":"interfaceID","type":"bytes4"}],
                "name":"supportsInterface",
                "outputs":[{"name":"","type":"bool"}],
                "payable":false,
                "stateMutability":"pure",
                "type":"function"
            },{
                constant:false,
                "inputs":[{"name":"node","type":"bytes32"},{"name":"key","type":"string"},{"name":"value","type":"string"}],
                "name":"setText",
                "outputs": new Array(),
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },{
                "constant":true,
                "inputs":[{"name":"node","type":"bytes32"},{"name":"contentTypes","type":"uint256"}],
                "name":"ABI",
                "outputs":[{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },{
                "constant":false,
                "inputs":[{"name":"node","type":"bytes32"},{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],
                "name":"setPubkey",
                "outputs": new Array(),
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },{
                "constant":true, // * deprecated This field is deprecated in favor of contenthash
                "inputs":[{"name":"node","type":"bytes32"}],
                "name":"content",
                "outputs":[{"name":"","type":"bytes32"}],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },{
                "constant":true,
                "inputs":[{"name":"node","type":"bytes32"}],
                "name":"addr",
                "outputs":[{"name":"","type":"address"}],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },{
                "constant":true,
                "inputs":[{"name":"node","type":"bytes32"},{"name":"key","type":"string"}],
                "name":"text",
                "outputs":[{"name":"","type":"string"}],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },{
                "constant":false,
                "inputs":[{"name":"node","type":"bytes32"},{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],
                "name":"setABI",
                "outputs": new Array(),
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },{
                "constant":true,
                "inputs":[{"name":"node","type":"bytes32"}],
                "name":"name",
                "outputs":[{"name":"","type":"string"}],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },{
                "constant":false,
                "inputs":[{"name":"node","type":"bytes32"},{"name":"name","type":"string"}],
                "name":"setName",
                "outputs": new Array(),
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },{
                "constant":false, // * deprecated This field is deprecated in favor of contenthash
                "inputs":[{"name":"node","type":"bytes32"},{"name":"hash","type":"bytes32"}],
                "name":"setContent",
                "outputs": new Array(),
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },{
                "constant":true,
                "inputs":[{"name":"node","type":"bytes32"}],
                "name":"pubkey",
                "outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],
                "payable":false,
                "stateMutability":"view",
                "type":"function"
            },{
                "constant":false,
                "inputs":[{"name":"node","type":"bytes32"},{"name":"addr","type":"address"}],
                "name":"setAddr",
                "outputs": new Array(),
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"function"
            },{
                "constant": false,
                "inputs": [{"name":"node","type":"bytes32"},{"name":"hash","type":"bytes"}],
                "name": "setContenthash",
                "outputs": new Array(),
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },{
                "constant": true,
                "inputs": [{"name":"node","type":"bytes32"}],
                "name": "contenthash",
                "outputs": [{"name":"","type":"bytes"}],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },{
                "inputs":[{"name":"ensAddr","type":"address"}],
                "payable":false,
                "stateMutability":"nonpayable",
                "type":"constructor"
            },{
                "anonymous":false,
                "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"a","type":"address"}],
                "name":"AddrChanged",
                "type":"event"
            },{
                "anonymous":false,
                "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"hash","type":"bytes32"}],
                "name":"ContentChanged",
                "type":"event"
            },{
                "anonymous":false,
                "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"name","type":"string"}],
                "name":"NameChanged",
                "type":"event"
            },{
                "anonymous":false,
                "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"contentType","type":"uint256"}],
                "name":"ABIChanged",
                "type":"event"
            },{
                "anonymous":false,
                "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"},{"indexed":false,"name":"y","type":"bytes32"}],
                "name":"PubkeyChanged",
                "type":"event"
            },{
                "anonymous":false,
                "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"indexedKey","type":"string"},{"indexed":false,"name":"key","type":"string"}],
                "name":"TextChanged",
                "type":"event"
            },{
                "anonymous": false,
                "inputs": [{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"hash","type":"bytes"}],
                "name": "ContenthashChanged",
                "type": "event"
            }
        ]

        // ABI of single methods
    //     RESOLVER_ABI_SUPPORTSINTEFACE: {
    //         "constant":true,
    //         "inputs":[{"name":"interfaceID","type":"bytes4"}],
    //         "name":"supportsInterface",
    //         "outputs":[{"name":"","type":"bool"}],
    //         "payable":false,
    //         "stateMutability":"pure",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_SETTEXT: {
    //         constant:false,
    //         "inputs":[{"name":"node","type":"bytes32"},{"name":"key","type":"string"},{"name":"value","type":"string"}],
    //         "name":"setText",
    //         "outputs": new Array(),
    //         "payable":false,
    //         "stateMutability":"nonpayable",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_ABI: {
    //         "constant":true,
    //         "inputs":[{"name":"node","type":"bytes32"},{"name":"contentTypes","type":"uint256"}],
    //         "name":"ABI",
    //         "outputs":[{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],
    //         "payable":false,
    //         "stateMutability":"view",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_SETPUBKEY: {
    //         "constant":false,
    //         "inputs":[{"name":"node","type":"bytes32"},{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],
    //         "name":"setPubkey",
    //         "outputs": new Array(),
    //         "payable":false,
    //         "stateMutability":"nonpayable",
    //         "type":"function"
    //     },
    //     /**
    //     * @deprecated This field is deprecated in favor of contenthash
    //     */
    //     RESOLVER_ABI_CONTENT: {
    //         "constant":true,
    //         "inputs":[{"name":"node","type":"bytes32"}],
    //         "name":"content",
    //         "outputs":[{"name":"","type":"bytes32"}],
    //         "payable":false,
    //         "stateMutability":"view",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_ADDR: {
    //         "constant":true,
    //         "inputs":[{"name":"node","type":"bytes32"}],
    //         "name":"addr",
    //         "outputs":[{"name":"","type":"address"}],
    //         "payable":false,
    //         "stateMutability":"view",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_TEXT: {
    //         "constant":true,
    //         "inputs":[{"name":"node","type":"bytes32"},{"name":"key","type":"string"}],
    //         "name":"text",
    //         "outputs":[{"name":"","type":"string"}],
    //         "payable":false,
    //         "stateMutability":"view",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_SETABI: {
    //         "constant":false,
    //         "inputs":[{"name":"node","type":"bytes32"},{"name":"contentType","type":"uint256"},{"name":"data","type":"bytes"}],
    //         "name":"setABI",
    //         "outputs": new Array(),
    //         "payable":false,
    //         "stateMutability":"nonpayable",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_NAME: {
    //         "constant":true,
    //         "inputs":[{"name":"node","type":"bytes32"}],
    //         "name":"name",
    //         "outputs":[{"name":"","type":"string"}],
    //         "payable":false,
    //         "stateMutability":"view",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_SETNAME: {
    //         "constant":false,
    //         "inputs":[{"name":"node","type":"bytes32"},{"name":"name","type":"string"}],
    //         "name":"setName",
    //         "outputs": new Array(),
    //         "payable":false,
    //         "stateMutability":"nonpayable",
    //         "type":"function"
    //     },
    // /**
    // * @deprecated This field is deprecated in favor of contenthash
    // */
    // // // RESOLVER_ABI_SETMULTIHASH: {
    // // //     "constant":false,
    // // //     "inputs":[{"name":"node","type":"bytes32"},{"name":"hash","type":"bytes"}],
    // // //     "name":"setMultihash",
    // // //     "outputs":[],
    // // //     "payable":false,
    // // //     "stateMutability":"nonpayable",
    // // //     "type":"function"
    // // // },
    //     /**
    //     * @deprecated This field is deprecated in favor of contenthash
    //     */
    //     RESOLVER_ABI_SETCONTENT: {
    //         "constant":false,
    //         "inputs":[{"name":"node","type":"bytes32"},{"name":"hash","type":"bytes32"}],
    //         "name":"setContent",
    //         "outputs": new Array(),
    //         "payable":false,
    //         "stateMutability":"nonpayable",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_PUBKEY: {
    //         "constant":true,
    //         "inputs":[{"name":"node","type":"bytes32"}],
    //         "name":"pubkey",
    //         "outputs":[{"name":"x","type":"bytes32"},{"name":"y","type":"bytes32"}],
    //         "payable":false,
    //         "stateMutability":"view",
    //         "type":"function"
    //     },

    //     RESOLVER_ABI_SETADDR: {
    //         "constant":false,
    //         "inputs":[{"name":"node","type":"bytes32"},{"name":"addr","type":"address"}],
    //         "name":"setAddr",
    //         "outputs": new Array(),
    //         "payable":false,
    //         "stateMutability":"nonpayable",
    //         "type":"function"
    //     },
    // /**
    // * @deprecated This field is deprecated in favor of contenthash
    // */
    // // RESOLVER_ABI_MULTIHASH: {
    // //     "constant":true,
    // //     "inputs":[{"name":"node","type":"bytes32"}],
    // //     "name":"multihash",
    // //     "outputs":[{"name":"","type":"bytes"}],
    // //     "payable":false,
    // //     "stateMutability":"view",
    // //     "type":"function"
    // // },
        // RESOLVER_ABI_SETCONTENTHASH: {
        //     "constant": false,
        //     "inputs": [{"name":"node","type":"bytes32"},{"name":"hash","type":"bytes"}],
        //     "name": "setContenthash",
        //     "outputs": new Array(),
        //     "payable": false,
        //     "stateMutability": "nonpayable",
        //     "type": "function"
        // },

        // RESOLVER_ABI_CONTENTHASH: {
        //     "constant": true,
        //     "inputs": [{"name":"node","type":"bytes32"}],
        //     "name": "contenthash",
        //     "outputs": [{"name":"","type":"bytes"}],
        //     "payable": false,
        //     "stateMutability": "view",
        //     "type": "function"
        // },

        // RESOLVER_ABI_CONSTRUCTOR: {
        //     "inputs":[{"name":"ensAddr","type":"address"}],
        //     "payable":false,
        //     "stateMutability":"nonpayable",
        //     "type":"constructor"
        // },

        // RESOLVER_ABI_EVENT_ADDRCHANGED: {
        //     "anonymous":false,
        //     "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"a","type":"address"}],
        //     "name":"AddrChanged",
        //     "type":"event"
        // },
        // /**
        // * @deprecated This field is deprecated in favor of contenthash
        // */
        // RESOLVER_ABI_EVENT_CONTENTCHANGED: {
        //     "anonymous":false,
        //     "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"hash","type":"bytes32"}],
        //     "name":"ContentChanged",
        //     "type":"event"
        // },
        // RESOLVER_ABI_EVENT_NAMECHANGED: {
        //     "anonymous":false,
        //     "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"name","type":"string"}],
        //     "name":"NameChanged",
        //     "type":"event"
        // },
        // RESOLVER_ABI_EVENT_ABICHANGED: {
        //     "anonymous":false,
        //     "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"contentType","type":"uint256"}],
        //     "name":"ABIChanged",
        //     "type":"event"
        // },
        // RESOLVER_ABI_EVENT_PUBKEYCHANGED: {
        //     "anonymous":false,
        //     "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"x","type":"bytes32"},{"indexed":false,"name":"y","type":"bytes32"}],
        //     "name":"PubkeyChanged",
        //     "type":"event"
        // },
        // RESOLVER_ABI_EVENT_TEXTCHANGED: {
        //     "anonymous":false,
        //     "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"indexedKey","type":"string"},{"indexed":false,"name":"key","type":"string"}],
        //     "name":"TextChanged",
        //     "type":"event"
        // },

    /**
    * @deprecated This field is deprecated in favor of contenthash
    */
    // // RESOLVER_ABI_EVENT_MULTIHASHCHANGED: {
    // //     "anonymous":false,
    // //     "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"hash","type":"bytes"}],
    // //     "name":"MultihashChanged",
    // //     "type":"event"
    // // },
        // RESOLVER_ABI_EVENT_CONTENTHASHCHANGED: {
        //     "anonymous": false,
        //     "inputs": [{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"hash","type":"bytes"}],
        //     "name": "ContenthashChanged",
        //     "type": "event"
        // },

    // contract ABI
    // RESOLVER_ABI: [],
    // initResolverAbi: function(){
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_SUPPORTSINTEFACE)	// 0x01ffc9a7
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_SETTEXT)
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_ABI)				// 0x2203ab56
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_SETPUBKEY)
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_CONTENT)			// 0xd8389dc5	// deprecated
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_ADDR)				// 0x3b3b57de
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_TEXT)				// 0x59d1d43c
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_SETABI)
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_NAME)				// 0x691f3431
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_SETNAME)
    //     // this.RESOLVER_ABI.push(this.RESOLVER_ABI_SETMULTIHASH)					// deprecated
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_SETCONTENT)						// deprecated
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_PUBKEY)			// 0xc8690233
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_SETADDR)
    //     // this.RESOLVER_ABI.push(this.RESOLVER_ABI_MULTIHASH)		// 0xe89401a1	// deprecated
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_SETCONTENTHASH)
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_CONTENTHASH)		// 0xbc1c58d1
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_CONSTRUCTOR)
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_EVENT_ADDRCHANGED)
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_EVENT_CONTENTCHANGED)              // deperecated
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_EVENT_NAMECHANGED)
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_EVENT_ABICHANGED)
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_EVENT_PUBKEYCHANGED)
    //     this.RESOLVER_ABI.push(this.RESOLVER_ABI_EVENT_TEXTCHANGED)
    //     // this.RESOLVER_ABI.push(this.RESOLVER_ABI_EVENT_MULTIHASHCHANGED)         // deprecated
    // },
        // RESOLVER_ABI: [ // ? THIS IS NOT WORKING, all value of RESOLVER_ABI are 'undefined' at run time
            // this.RESOLVER_ABI_SUPPORTSINTEFACE,	// 0x01ffc9a7
        //     this.RESOLVER_ABI_SETTEXT,
        //     this.RESOLVER_ABI_ABI,				// 0x2203ab56
        //     this.RESOLVER_ABI_SETPUBKEY,
        //     this.RESOLVER_ABI_CONTENT,			// 0xd8389dc5	// deprecated
        //     this.RESOLVER_ABI_ADDR,				// 0x3b3b57de
        //     this.RESOLVER_ABI_TEXT,				// 0x59d1d43c
        //     this.RESOLVER_ABI_SETABI,
        //     this.RESOLVER_ABI_NAME,				// 0x691f3431
        //     this.RESOLVER_ABI_SETNAME,
        //     // this.RESOLVER_ABI_SETMULTIHASH,                      // deprecated
        //     this.RESOLVER_ABI_SETCONTENT,						// deprecated
        //     this.RESOLVER_ABI_PUBKEY,			// 0xc8690233
        //     this.RESOLVER_ABI_SETADDR,
        //     // this.RESOLVER_ABI_MULTIHASH,			// 0xe89401a1	// deprecated
        //     this.RESOLVER_ABI_SETCONTENTHASH,
        //     this.RESOLVER_ABI_CONTENTHASH,		// 0xbc1c58d1
        //     this.RESOLVER_ABI_CONSTRUCTOR,
        //     this.RESOLVER_ABI_EVENT_ADDRCHANGED,
        //     this.RESOLVER_ABI_EVENT_CONTENTCHANGED,              // deprecated
        //     this.RESOLVER_ABI_EVENT_NAMECHANGED,
        //     this.RESOLVER_ABI_EVENT_ABICHANGED,
        //     this.RESOLVER_ABI_EVENT_PUBKEYCHANGED,
        //     this.RESOLVER_ABI_EVENT_TEXTCHANGED,
        //     // this.RESOLVER_ABI_EVENT_MULTIHASHCHANGED,            // deprecated
        // ],
    }

    /////////////////////////////////////////////////////////////////////////////
    //								REGISTRY
    /////////////////////////////////////////////////////////////////////////////
    export const REGISTRY = {
        ADDRESS: {
            MAINNET: "0x314159265dD8dbb310642f98f50C066173C1259b",
            ROPSTEN: "0x112234455C3a32FD11230C42E7Bccd4A84e02010",
            RINKEBY: "0xe7410170f87102df0055eb195163a03b7f2bff4a",
        },
        ABI: [
        {
            "constant":true,
            "inputs":[{"name":"node","type":"bytes32"}],
            "name":"resolver",
            "outputs":[{"name":"","type":"address"}],
            "payable":false,"type":"function"
        },{
            "constant":true,
            "inputs":[{"name":"node","type":"bytes32"}],
            "name":"owner",
            "outputs":[{"name":"","type":"address"}],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"node","type":"bytes32"},{"name":"label","type":"bytes32"},{"name":"owner","type":"address"}],
            "name":"setSubnodeOwner",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"node","type":"bytes32"},{"name":"ttl","type":"uint64"}],
            "name":"setTTL",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[{"name":"node","type":"bytes32"}],
            "name":"ttl",
            "outputs":[{"name":"","type":"uint64"}],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"node","type":"bytes32"},{"name":"resolver","type":"address"}],
            "name":"setResolver",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"node","type":"bytes32"},{"name":"owner","type":"address"}],
            "name":"setOwner",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"}],
            "name":"Transfer",
            "type":"event"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":true,"name":"label","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"}],
            "name":"NewOwner",
            "type":"event"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"resolver","type":"address"}],
            "name":"NewResolver",
            "type":"event"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"node","type":"bytes32"},{"indexed":false,"name":"ttl","type":"uint64"}],
            "name":"NewTTL",
            "type":"event"
        }
        ],
    }


    //---------------------------------------------------------------------------
    //								REGISTRAR
    //---------------------------------------------------------------------------
    export const REGISTRAR = {
        
        // AUCTION --------------------------------------------------------------
        AUCTION: [
        {
            "constant":false,
            "inputs":[{"name":"_hash","type":"bytes32"}],
            "name":"releaseDeed",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[{"name":"_hash","type":"bytes32"}],
            "name":"getAllowedTime",
            "outputs":[{"name":"timestamp","type":"uint256"}],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"unhashedName","type":"string"}],
            "name":"invalidateName",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[{"name":"hash","type":"bytes32"},{"name":"owner","type":"address"},{"name":"value","type":"uint256"},{"name":"salt","type":"bytes32"}],
            "name":"shaBid",
            "outputs":[{"name":"sealedBid","type":"bytes32"}],
            "payable":false,"type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"bidder","type":"address"},{"name":"seal","type":"bytes32"}],
            "name":"cancelBid",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[{"name":"_hash","type":"bytes32"}],
            "name":"entries",
            "outputs":[{"name":"","type":"uint8"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],
            "payable":false,"type":"function"
        },{
            "constant":true,
            "inputs":[],
            "name":"ens",
            "outputs":[{"name":"","type":"address"}],
            "payable":false,"type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"_hash","type":"bytes32"},{"name":"_value","type":"uint256"},{"name":"_salt","type":"bytes32"}],
            "name":"unsealBid",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"_hash","type":"bytes32"}],
            "name":"transferRegistrars",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"}],
            "name":"sealedBids",
            "outputs":[{"name":"","type":"address"}],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[{"name":"_hash","type":"bytes32"}],
            "name":"state",
            "outputs":[{"name":"","type":"uint8"}],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"_hash","type":"bytes32"},{"name":"newOwner","type":"address"}],
            "name":"transfer",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[{"name":"_hash","type":"bytes32"},{"name":"_timestamp","type":"uint256"}],
            "name":"isAllowed",
            "outputs":[{"name":"allowed","type":"bool"}],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"_hash","type":"bytes32"}],
            "name":"finalizeAuction",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[],
            "name":"registryStarted",
            "outputs":[{"name":"","type":"uint256"}],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"sealedBid","type":"bytes32"}],
            "name":"newBid",
            "outputs":[],
            "payable":true,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"labels","type":"bytes32[]"}],
            "name":"eraseNode",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"_hashes","type":"bytes32[]"}],
            "name":"startAuctions",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"hash","type":"bytes32"},{"name":"deed","type":"address"},{"name":"registrationDate","type":"uint256"}],
            "name":"acceptRegistrarTransfer",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"_hash","type":"bytes32"}],
            "name":"startAuction",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[],
            "name":"rootNode",
            "outputs":[{"name":"","type":"bytes32"}],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"hashes","type":"bytes32[]"},{"name":"sealedBid","type":"bytes32"}],
            "name":"startAuctionsAndBid",
            "outputs":[],
            "payable":true,
            "type":"function"
        },{
            "inputs":[{"name":"_ens","type":"address"},{"name":"_rootNode","type":"bytes32"},{"name":"_startDate","type":"uint256"}],
            "payable":false,
            "type":"constructor"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":false,"name":"registrationDate","type":"uint256"}],
            "name":"AuctionStarted",
            "type":"event"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"bidder","type":"address"},{"indexed":false,"name":"deposit","type":"uint256"}],
            "name":"NewBid",
            "type":"event"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"status","type":"uint8"}],
            "name":"BidRevealed",
            "type":"event"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"registrationDate","type":"uint256"}],
            "name":"HashRegistered",
            "type":"event"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],
            "name":"HashReleased",
            "type":"event"
        },{
            "anonymous":false,
            "inputs":[{"indexed":true,"name":"hash","type":"bytes32"},{"indexed":true,"name":"name","type":"string"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"registrationDate","type":"uint256"}],
            "name":"HashInvalidated",
            "type":"event"
        }
    ],

    // FIFS --------------------------------------------------------------
    FIFS: [
        {
            "constant":true,
            "inputs":[],
            "name":"ens",
            "outputs":[{"name":"","type":"address"}],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[{"name":"","type":"bytes32"}],
            "name":"expiryTimes",
            "outputs":[{"name":"","type":"uint256"}],
            "payable":false,
            "type":"function"
        },{
            "constant":false,
            "inputs":[{"name":"subnode","type":"bytes32"},{"name":"owner","type":"address"}],
            "name":"register",
            "outputs":[],
            "payable":false,
            "type":"function"
        },{
            "constant":true,
            "inputs":[],
            "name":"rootNode",
            "outputs":[{"name":"","type":"bytes32"}],
            "payable":false,
            "type":"function"
        },{
            "inputs":[{"name":"ensAddr","type":"address"},{"name":"node","type":"bytes32"}],
            "type":"constructor"
        }
        ],
    
        // REVERSE --------------------------------------------------------------
        REVERSE: [
        {
            "constant": false,
            "inputs": [{"name": "owner","type": "address"},{"name": "resolver","type": "address"}],
            "name": "claimWithResolver",
            "outputs": [{"name": "","type": "bytes32"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{"name": "owner","type": "address"}],
            "name": "claim",
            "outputs": [{"name": "","type": "bytes32"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "ens",
            "outputs": [{"name": "","type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "ADDR_REVERSE_NODE",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "defaultResolver",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "node",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "name",
                    "type": "string"
                }
            ],
            "name": "setName",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "ensAddr",
                    "type": "address"
                },
                {
                    "name": "resolverAddr",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }
        ],
    }
    
    //--------------------------------------------------------------
    // 								DEED CONTRACT
    //--------------------------------------------------------------
    export const DEED = {
        ABI: [
        {
            "constant": true,
            "inputs": [],
            "name": "creationDate",
            "outputs": [{"name": "","type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "destroyDeed",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{"name": "newOwner","type": "address"}],
            "name": "setOwner",
            "outputs": new Array(),
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "value",
            "outputs": [{"name": "","type": "uint256"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "previousOwner",
            "outputs": [{"name": "","type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [{"name": "","type": "address"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{"name": "newValue","type": "uint256"},{"name": "throwOnFailure","type": "bool"}],
            "name": "setBalance",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{"name": "refundRatio","type": "uint256"}],
            "name": "closeDeed",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [{"name": "newRegistrar","type": "address"}],
            "name": "setRegistrar",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"name": "initialOwner","type": "address"}],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [{"indexed": false,"name": "newOwner","type": "address"}],
            "name": "OwnerChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "DeedClosed",
            "type": "event"
        }
    ],
    }