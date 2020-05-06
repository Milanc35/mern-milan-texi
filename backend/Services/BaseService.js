class BaseService {
    static reportDbError(error, params) {
        params = params || {};
        //console.log(error);
        console.log(`Database Error, code: ${error.code}, Message: ${error.message}`);
        console.log(`Error Stack`, error.stack);
    }
}

module.exports = BaseService;
