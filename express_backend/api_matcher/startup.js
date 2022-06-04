import {initExpressServer,connectMongoose,clearDatabase} from '../common_base/common.js'
import {matchSong} from './main.js'
import * as config from './config.js';

export function init(){

    connectMongoose()
        .then(clearDatabase())
        .then(initExpressServer('Matcher', '/matcher/:id', 
        config.LISTEN_PORT, matchSong));
    }
