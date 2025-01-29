const ethers = require("ethers");

const phrase = "grow present script laundry spring lizard resist party arctic arrange seed solution";

const mnemonic = ethers.Mnemonic.fromPhrase(phrase);

const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`);
console.log(wallet.address);