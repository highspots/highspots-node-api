const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const {
    getByIdHighSession,
    createHighSession,
    getAllHighSessions,
    getOneHighSession,
    updateHighSession,
    updateHighSessionUrlParam,
    deleteHighSession,
} = require('../controllers/high-session');

router.param('highSessionId', getByIdHighSession);

router.route('/')
  .post(verify, createHighSession)
  .put(verify, updateHighSession)
  .get(verify, getAllHighSessions);

router.route('/:highSessionId')
  .get(verify, getOneHighSession)  
  .put(verify, updateHighSessionUrlParam)
  .delete(verify, deleteHighSession);

module.exports = router;