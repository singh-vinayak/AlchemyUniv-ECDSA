const { getRandomBytesSync } = require("ethereum-cryptography/random");
const { bytesToHex : toHex } = require("ethereum-cryptography/utils");
// console.log(toHex(getRandomBytesSync(32)));
module.exports = { 
    generateNonce(){
        return toHex(getRandomBytesSync(32));
    }
}