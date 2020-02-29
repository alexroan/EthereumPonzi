require("babel-register");
require("babel-polyfill");
require("dotenv").config();
const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKey = process.env.PRIVATE_KEY || "";
const mainnetPrivateKey = process.env.MAINNET_PRIVATE_KEY || "";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          //private keys array
          [privateKey],
          //url to ethereum node
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(
          //private keys array
          [mainnetPrivateKey],
          //url to ethereum node
          `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      gas: 2000000,
      gasPrice: 3000000000,
      network_id: 1
    }
  },
  compilers: {
    solc: {
      version: "0.5.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
