class BaseController {
    static _json (res, code, message, data, status) {
        if (res.headersSent) {
            console.log("Trying sent header again. Stack :", new Error().stack);
            return false;
        };
        status = status || 200;
        code   = code   || 0;
        message = message || (code == 0 ? "success" : "Something went wrong.");
        data   = data  || null;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.status(status).json({
            code : code,
            message : message,
            data: data
        });
        res.end();

        return true;
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

    static commonJsonResponse(res, result, failedMsg, successMsg, callback, failedCallback) {
        successMsg = successMsg || null;
        callback   = callback || null;
        failedCallback = failedCallback || null;
        if (result) {
            if (callback) {
                callback(result);
            }

            BaseController.successJson(res, result, successMsg);

            return result;
        }

        if (failedCallback) {
            failedCallback(result);
        }

        BaseController.errorJson(res, failedMsg);

        return result;
    }
}

module.exports = BaseController;
