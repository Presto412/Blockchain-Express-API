const mongoose = require('mongoose');
const crypto = require('crypto');

const blockSchema = mongoose.Schema({
  index: Number,
  data: Object,
  previousHash: String,
  hash: String
}, {
  timestamps: true
});

blockSchema.methods.calculateHash = function() {
  const hashString = JSON.stringify(this.data) + this.previousHash + this.index;
  const hash = crypto.createHash('md5').update(hashString).digest("hex");
  return hash;
};

module.exports = mongoose.model('Block', blockSchema);
