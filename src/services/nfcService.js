"use strict";

// Imports
import child_process from "child_process";
import _ from "lodash";
import watch from "node-watch";
import Cryptr from "cryptr";
import request from "request";
import fs from "fs";
const Gpio = require('onoff').Gpio;

// Variables
let nfcFilePath = __dirname + "/../../nfc.txt";
nfcFilePath = "/home/pi/Desktop/nfcReader/";
const encrptKey = "Cr0mwellTools";
const apiUrl = "https://reception.cromwell-tools.co.uk/";

// GPIO
const greenLed = new Gpio('21', 'out');
const redLed = new Gpio('20', 'out');
const buzzer = new Gpio('16', 'out');

export class NfcService {

    constructor (logger) {

        this._logger = logger;
    }

    execCommand() {

        return new Promise((resolve, reject) => {

            child_process.exec("stdbuf -i0 -o0 -e0 explorenfc-basic -k > " + nfcFilePath + "nfc.txt", (err, data) => {

                if(err) {
                    reject(err);
                }

            });
        });
    }

    startReading() {

        return new Promise((resolve, reject) => {

		this._logger.info("System Ready!");

            let watcher = watch(nfcFilePath);
            watcher.on("change", (file) => {

                this._getStaffId()
                    .then(staffId => {
                        this._logger.info("Making api request ....");

                        return this._apiRequest(staffId);

                    })
                    .then(() => {

                        this._logger.info("Api request completed.");

                    })
                    .catch(err => {
                        this._logger.error(err.message);
                        this._error();
                    })
            });

        });

    }

    _error() {

        buzzer.writeSync(1);
        setTimeout(function() {

            buzzer.writeSync(0);

            setTimeout(function() {

                buzzer.writeSync(1);
                setTimeout(function() {

                    buzzer.writeSync(0);

                },1000);

            },100);

        },500);
    }

    _apiRequest(staffId) {

        return new Promise((resolve, reject) => {
	   
	   this._logger.info(apiUrl + "nfcActivity/" + staffId);	

            request(apiUrl + "nfcActivity/" + staffId , (error, response, body) => {
		
		
                 this._logger.info("Api response " + body);

		 if (!error && response.statusCode == 200) {

                    try {
                        body = JSON.parse(body);
                    } catch(e) {
                        reject("Failed to parse JSON");
                    }

                    if(body.message == "Success") {

                        let activity = body.activity;

                            if(activity == "sign_in") {

                                this._logger.info("Staff with ID: "+ staffId + " has signed in" );

                                greenLed.writeSync(1);
                                buzzer.writeSync(1);

                                setTimeout(function() {
                                    buzzer.writeSync(0);
                                    greenLed.writeSync(0);
                                },200);

                            } else {

                                this._logger.info("Staff with ID: " + staffId + " has signed out");

                                redLed.writeSync(1);
                                buzzer.writeSync(1);
                                setTimeout(function() {
                                    buzzer.writeSync(0);
                                    redLed.writeSync(0);
                                },500);

                            }

                    } else {

                        this._logger.error("Failed to parse JSON from the api");
                        reject("Failed to parse JSON from the api");

                    }

                } else {
			this._logger.error(error.message);
			this._logger.error("Api Error!");
			reject("Api Error! Possibly no response from the api")
		}

            });

        });
    }

    _getStaffId() {

        return new Promise((resolve, reject) => {

            let cryptr = new Cryptr(encrptKey);
            let file = fs.readFileSync(nfcFilePath+ "nfc.txt");
            let token =  file.toString();
            let tokenArray = token.split(/\r?\n/);

            tokenArray.reverse();
	    console.log(JSON.stringify(tokenArray));

            if (tokenArray[8] && tokenArray[8].indexOf("Title:") !== -1) {

                let userIdArray =  tokenArray[8].split(":");
                let staffId  = cryptr.decrypt(userIdArray[1].trim());
		this._logger.info("Staff Id Found " + staffId);
                resolve(staffId);

            } else {

                this._logger.error("Invalid token received");
                reject("Invalid Token");

            }

        });
    }
}
