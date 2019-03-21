
let ens

window.onload = async () => {
    
    // METAMASK
    await ethereum.enable()
    let provider = await new ethers.providers.Web3Provider(ethereum)
    let signer = provider.getSigner()

    let address = await signer.getAddress()
    console.log(address)

    ens = new easyns.ENS(signer)
}