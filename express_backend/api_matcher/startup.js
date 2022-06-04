import {initExpressServer,connectMongoose,clearDatabase} from '../common_base/common.js'
import {requestMatcher} from './main.js'
import * as config from './config.js';

export function init()
{
    connectMongoose()
        .then(clearDatabase())
        .then(initExpressServer('Matcher', '/matcher/:songname', 
        config.LISTEN_PORT, requestMatcher));
};
