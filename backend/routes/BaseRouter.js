const testRouter    = require('../routes/test');
const driverRouter  = require('../routes/driver');
const bookingRouter = require('../routes/booking');
const workRouter    = require('../routes/work');
const settingRouter = require('../routes/setting');

class BaseRouter {
    appInstance = null;
    constructor(appInstance) {  // Constructor
        this.appInstance = appInstance;
    }

    loadMiddleware() {
        const app = this.appInstance;
    }

    loadRoutes() {
        const app = this.appInstance;
        // Add your routes here.
        app.use('/api/test', testRouter);
        app.use('/api/driver', driverRouter);
        app.use('/api/booking', bookingRouter);
        app.use('/api/work', workRouter);
        app.use('/api/setting', settingRouter);
    }
}

module.exports = BaseRouter;
