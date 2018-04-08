const express = require('express');
const router = express.Router();
const Blockchain = require('../models/blockchain');
const Block = require('../models/block');

/**
 * POST /create
 * creates a chain
 */
router.post('/create', function (req, res, next) {
  let chain = new Blockchain();
  chain.save().then(() => {
    return res.json({
      "message": "Chain created!"
    });
  }).catch((err) => next(err));
});

/**
 * POST addBlock
 * body: Object
 * adds a block to the chain
 */
router.post('/addblock', (req, res, next) => {
  return Blockchain.findOne().exec()
    .then((chain) => {
      if (!chain) return next(new Error('Create blockchain first'));
      chain.addBlock(req.body)
        .then((result) => {
          result.save().then(() => {
            return res.json({
              message: "Block successfully added.",
              result: result
            });
          })
        }).catch((err) => next(err));
    })
});

/**
 * GET verifychain
 * tells if chain is valid
 */
router.get('/verifychain', (req, res, next) => {
  return Blockchain.findOne().exec()
    .then((chain) => {
      return chain.validateChain()
        .then((outcome) => res.json({
          success: true,
          "message": outcome
        }))
    }).catch((err) => next(err));
})

/**
 * GET emptydb
 * empties the database
 */
router.get('/emptydb', (req, res, next) => {
  Blockchain.remove({}).exec()
    .then(() => Block.remove({}).exec())
    .then(() => res.json({
      success: true
    }))
    .catch((err) => next(err));
})
module.exports = router;
