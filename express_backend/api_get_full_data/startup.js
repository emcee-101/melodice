
import {initExpressServer} from '../common_base/common.js'
import {handleFullDataRequest} from './main.js'
import { LISTEN_PORT } from "./config.js";


// Some Method Signatures for Methods called here:
//          initExpressServer(name, url_suffix, port, callback_function)
//          handleLyricsRequest(req, res)


// start GetFullData API
export function init(){
    
    
    initExpressServer('GetFullData', '/getfulldata/:id?', LISTEN_PORT, handleFullDataRequest);

    }
