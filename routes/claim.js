const soap = require('../modules/soap-helper');
const express = require('express');
const router = express.Router();

/* GET a claim. */
router.get('/:id', async (req, res, next) => {
  try {
    await soap.connect();
    const response = await soap.call('getClaim', {claimPublicID: req.params.id});
    return res.send(response.result);
  } catch (error) {
    return next(error);
  }
});

/* GET claim state. */
router.get('/:id/state/', async (req, res, next) => {
  try {
    await soap.connect();
    const response = await soap.call('getClaimState', {claimPublicID: req.params.id});
    return res.send(response.result);
  } catch (error) {
    return next(error);
  }
});

/* POST claim document. */
router.post('/:id/document/', async (req, res, next) => {
  try {
    await soap.connect();
    const someDocument = 'tester';
    const response = await soap.call('getClaimState', {claimPublicID: req.params.id, doc: someDocument});
    return res.send(response.result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
