const mongoose = require('mongoose');

class Database {
    static #dbtype =  null;
    static connect(type, options) {
        Database.#dbtype = type
        switch (type) {
            case "mongodb":
                mongoose.connect(options.uri || null,
                    {
                        useNewUrlParser: true,
                        useCreateIndex: true,
                    }
                ).catch(error => {
                    console.log(`Error Connecting database. Error: ${error.message}`);
                    throw error;
                });
                const connection = mongoose.connection;
                connection.once('open', () => {
                    console.log("MongoDB database connection established successfully");
                });
                break;
            default:

        }
    }
}

module.exports = Database;
