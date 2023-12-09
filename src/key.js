const { generateKeySync } = require("crypto");

class Key {
    minBit = 256;

    genKey(n = this.minBit) {
        if (n < this.minBit) n = this.minBit;
        return generateKeySync("hmac", { length: n }).export().toString("hex");
    }
}

module.exports = new Key();
