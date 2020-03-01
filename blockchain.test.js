const Blockchain = require("./blockchain");
const Block = require("./block");

describe("Blockchain", () => {
  const blockchain = new Blockchain();

  it("contains `chain` array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it("starts with genesis", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block", () => {
    const newData = "foo-bar";
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });
});
