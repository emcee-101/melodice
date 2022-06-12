import {initExpressServer,connectMongoose,clearDatabase} from '../common_base/common.js'
import {requestPost} from './main.js'
import * as config from './config.js';

export function init()
{
    initExpressServer('Matcher', '/matcher/:songname', 10097, requestPost);
};
