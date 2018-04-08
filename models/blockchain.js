const mongoose = require('mongoose');
const Promise = require('bluebird');
const Block = require('./block');

const blockChainSchema = mongoose.Schema({
  chain: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Block'
  }]
});

/**
 * @function addBlock
 * @param {Object} data
 */
blockChainSchema.methods.addBlock = function (data) {
  return this.model('Blockchain').findOne()
    .populate('chain', 'hash').exec()
    .then((chain) => {
      const index = this.chain.length;
      const previousHash = index !== 0 ? chain.chain[index - 1].hash : "0";
      let block = new Block({
        index: index,
        previousHash: previousHash,
        data: data
      });
      block.hash = block.calculateHash()
      return block.save().then((savedBlock) => {
        this.chain.push(savedBlock._id);
        return Promise.resolve(this);
      });
    })
    .catch((err) => Promise.reject(err));
};

/**
 * @function validateChain
 */
blockChainSchema.methods.validateChain = function () {
  return this.model('Blockchain').findOne()
    .populate('chain').exec()
    .then((chain) => {
      return Promise.map(chain.chain, (block, index) => {
        let outcome = "Valid";
        if (block.hash !== block.calculateHash())
          outcome = "Invalid Cause hash mismatch";
        if (index > 0 && chain.chain[index].previousHash !== chain.chain[index - 1].hash)
          outcome = "Invalid cause previous hash mismatch"
        return outcome
      }).then((validities) => {
        return Promise.resolve(validities)
      })
    })
    .catch(err => Promise.reject(err));
}

module.exports = mongoose.model('Blockchain', blockChainSchema);
