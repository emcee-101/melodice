
import {initExpressServer,connectMongoose,clearDatabase} from '../common_base/common.js'
import {handleLyricsrequest,testCase} from './main.js'

// Some Method Signatures for Methods called here:
//          initExpressServer(name, url_suffix, port, callback_function)
//          handleLyricsRequest(req, res)


// start Lyrics API
export function init(){
    
    connectMongoose()
        .then(clearDatabase())
        .then(testCase())
        .then(initExpressServer('Lyrics', '/lyrics/:parameter', 10093, handleLyricsrequest));

    }
