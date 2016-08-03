"use strict";

/* Third-party modules */
var bunyan = require("bunyan");

export class Logger {

    constructor() {
        this._log = bunyan.createLogger({
                        name: "Cromwell Reporting API"
                    });
    }

    info(message) {
        this._log.info(message);
    }

    warn(message) {
        this._log.warn(message);
    }

    error(message) {
        this._log.error(message);
    }

    fatal(message) {
        console.log(message);
        this._log.fatal(message);
    }
}
