
import {initExpressServer} from '../common_base/common.js'
import {handleLyricsRequest} from './main.js'
import { LISTEN_PORT } from "./config.js";


// Some Method Signatures for Methods called here:
//          initExpressServer(name, url_suffix, port, callback_function)
//          handleLyricsRequest(req, res)


// start Lyrics API
export function init(){
    
    
    initExpressServer('Lyrics', '/lyrics/:parameter', LISTEN_PORT, handleLyricsRequest);

    }
