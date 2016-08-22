/**
 * app
 */

"use strict";

import config from "./config.json";

import restify from "restify";
import fs from "fs";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

/* Files */
import {Logger} from "./lib/logger";

import {NfcService} from "./services/nfcService";

// Logger
let logger = new Logger();

let nfcService = new NfcService(logger);
 nfcService.execCommand()
     .catch(err => {
	logger.error(err.message);
         logger.error('NFC Error, Cannot recover restating....');
         process.exit();
     })

nfcService.startReading()
    .catch(err => {
        logger.error('NFC Read Error, Cannot recover restating....');
        process.exit();
    });



