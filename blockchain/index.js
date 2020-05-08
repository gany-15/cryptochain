const Block = require("./block");
const cryptohash = require("../util/crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.minedBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    });
    this.chain.push(newBlock);
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.error("Incoming chain must be longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("Incoming chain must be valid");
      return;
    }
    this.chain = chain;
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, difficulty, nonce, data } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;
      if (actualLastHash !== lastHash) return false;
      const validatedHash = cryptohash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );
      if (hash !== validatedHash) return false;
      if (Math.abs(lastDifficulty - difficulty > 1)) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
