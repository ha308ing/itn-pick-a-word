const { createHmac } = require("crypto");

class Hmac {
    genHmac(message, key) {
        return createHmac("sha256", key).update(message).digest("hex");
    }
}

module.exports = new Hmac();
