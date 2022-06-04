import {initExpressServer,connectMongoose,clearDatabase} from '../common_base/common.js'
import {matchSong} from './main.js'
const LISTEN_PORT = 10092;

export function init(){
    connectMongoose()
    .then(clearDatabase())
    .then(testCase())
    .then(initExpressServer('Matcher', '/matcher/:id', LISTEN_PORT, matchSong));

    }
