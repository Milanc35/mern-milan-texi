class Response {
    static _json (res, code, message, data, status) {
        status = status || 200;
        code   = code   || 0;
        message = message || code == 0 ? "success" : "Something went wrong.";
        data   = data  || null;
        res.status(status).json({
            code : code,
            message : message,
            data: data
        });
    }

    static successJson (res, data, message) {
        message = message || null;
        data    = data || null;
        this._json(res, 0, message, data);
    }

    static errorJson (res, message, code, data) {
        message = message || "error";
        data    = data || null;
        code    = code || -1;
        this._json(res, code, message, data);
    }

    static httpErrorJson (res, status, message, data, code) {
        message = message || "error";
        data    = data || null;
        code    = code || -1;
        this._json(res, code, message, data, status);
    }
}

module.exports = Response;
