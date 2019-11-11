var express = require('express');
var router = express.Router();

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
  .post(createHighSession)
  .put(updateHighSession)
  .get(getAllHighSessions);

router.route('/:highSessionId')
  .get(getOneHighSession)  
  .put(updateHighSessionUrlParam)
  .delete(deleteHighSession);

module.exports = router;