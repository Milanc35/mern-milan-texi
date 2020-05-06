class ServerUtils {
    /**
    * Normalize a port into a number, string, or false.
    */
    static normalizePort(val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    /**
    * Event listener for HTTP server "error" event.
    */
    static onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
            case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
            default:
            throw error;
        }
    }

    /**
    * Event listener for HTTP server "listening" event.
    */
    static onListening() {
        var addr = server.address();
        var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
        console.error('Listening on ' + bind);
    }

    static getAllFiles(dirPath, arrayOfFiles) {
        files = fs.readdirSync(dirPath)
        arrayOfFiles = arrayOfFiles || []
        files.forEach(function(file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = ServerUtils.getAllFiles(dirPath + "/" + file, arrayOfFiles)
            } else {
                arrayOfFiles.push(path.join(dirPath, "/", file))
            }
        })
        return arrayOfFiles;
    }

    static getHttpErrorMessage(errorCode) {
        const HttpError = {
            "200": {"message": "OK"}, // Standard response for successful HTTP requests
            "201": {"message": "Created"}, // Request has been fulfilled. New resource created
            "204": {"message": "No Content"}, // Request processed. No content returned
            "301": {"message": "Moved Permanently"}, // This and all future requests directed to the given URI
            "304": {"message": "Not Modified"}, // Resource has not been modified since last requested
            "400": {"message": "Bad Request"}, // Request cannot be fulfilled due to bad syntax
            "401": {"message": "Unauthorized"}, //Authentication is possible, but has faileds
            "403": {"message": "Forbidden"}, // Server refuses to respond to request
            "404": {"message": "Not Found"}, // Requested resource could not be found
            "500": {"message": "Internal Server Error"}, // Generic error message when server fails
            "501": {"message": "Not Implemented"}, // Server does not recognize method or lacks ability to fulfill
            "503": {"message": "Service Unavailable"}, // Server is currently unavailable
        };
        errorCode = errorCode || null;
        if (!errorCode) {
            return HttpError;
        }

        return (HttpError[errorCode] || errorCode[404]);
    }
}

module.exports = ServerUtils;
