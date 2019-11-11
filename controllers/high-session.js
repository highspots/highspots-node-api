const HighSession =  require("../models/high-session");

exports.createHighSession = function (req, res, next) {
    const highSession = new HighSession(req.body);



    highSession.save(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(highSession);
        }
    });
};

exports.updateHighSessionUrlParam = function (req, res, next) {
    HighSession.findByIdAndUpdate(req.params.highSessionId, req.body, { new: true }, function (err, highSession) {
        console.log('err', err, 'highSession', highSession)
        if (err) {
            next(err);
        } else {
            res.json(highSession);
        }
    });
};

exports.updateHighSession = function (req, res, next) {
    HighSession.findByIdAndUpdate(req.body._id, req.body, { new: true, useFindAndModify: false }, function (err, highSession) {
        console.log('err', err, 'highSession', highSession)
        if (err) {
            next(err);
        } else {
            res.json(highSession);
        }
    });
};

exports.deleteHighSession = function (req, res, next) {
    req.highSession.remove(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(req.highSession);
        }
    });
};

exports.getAllHighSessions = function (req, res, next) {
    HighSession.find(function (err, highSessions) {
        if (err) {
            next(err);
        } else {
            res.json(highSessions);
        }
    });
};

exports.getOneHighSession = function (req, res) {
    res.json(req.highSession);
};

exports.getByIdHighSession = function (req, res, next, id) {
    HighSession.findOne({ _id: id }, function (err, highSession) {
        if (err) {
            next(err);
        } else {
            req.highSession = highSession;
            next();
        }
    });
};