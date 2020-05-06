const express      = require('express');
const BaseRouter   = require('../routes/BaseRouter');
const ServerUtils = require('../Helpers/ServerUtils');
const Database     = require('./Database');

class App {
    static instance  = null;
    static appParams = {};

    static init(params) {
        params = params || {};
        const app = express();
        app.use(express.json());
        App.appParams = params;
        App.instance = app;
        App.resourceHandler();
        App.routerhandler();
        App.errorHandler();
        App.databaseHandler();
    }

    static databaseHandler() {
        const uri = App.appParams.MONGODB_URI;
        Database.connect('mongodb', {
            uri: uri,
        });
    }

    static routerhandler() {
        const app = App.instance;
        const baseRouter = new BaseRouter(App.instance);
        baseRouter.loadMiddleware();
        baseRouter.loadRoutes();
    }

    static resourceHandler() {
        //app.use(express.static(path.join(__dirname, 'build')));
    }

    static errorHandler() {
        const app = App.instance;
        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });


        // error handler
        app.use(function(err, req, res, next) {
            if (res.headersSent) {
                return next(err);
            }
            // set locals, only providing error in development
            res.locals.message = err.message;
            let httpError = `Error Occured. Error: ${err.message}`;
            const httpStatus = err.status || 500;
            if (App.appParams.ENV !== 'dev' || [500, 501].indexOf(httpStatus) === -1) {
                httpError = ServerUtils.getHttpErrorMessage(httpStatus).message;
            } else {
                console.log(httpError);
            }

            res.locals.error = App.appParams.ENV === 'dev' ? err : {};
            // render the error page
            /*
            res.status(err.status || 500);
            //res.render('error');
            res.send(err.status == 500 ? "Internal server error" : "Page Not found");
            */
            res.status(httpStatus);
            res.send(httpError);
            res.end();
        });
    }

    static startServer() {
        const app = App.instance;
        /**
        * Get port from environment and store in Express.
        */
        const port = ServerUtils.normalizePort(App.appParams.SERVER_PORT || '3000');
        app.set('port', port);

        /**
        * Listen on provided port, on all network interfaces.
        */
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
        app.on('error', ServerUtils.onError);
        app.on('listening', ServerUtils.onListening);
    }
}

module.exports = App;
