
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks : {
    "pwreth+" : {
      url : process.env.RPC_URL,
      accounts : [process.env.PRIVATE_KEY]
    }
  },
  etherscan : {
    apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      'pwr-eth+': "abc"
    },
    customChains: [
      {
        network: "pwreth+",
        chainId: 10023,
        urls: {
          apiURL: "https://ethplusexplorer.pwrlabs.io/api",
          browserURL: "https://ethplusexplorer.pwrlabs.io/",
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  }
};