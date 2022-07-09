
import {initExpressServer} from '../common_base/common.js'
import {handleFullDataRequest} from './main.js'

// Some Method Signatures for Methods called here:
//          initExpressServer(name, url_suffix, port, callback_function)
//          handleLyricsRequest(req, res)


// start GetFullData API
export function init(){
    
    
    initExpressServer('GetFullData', '/getfulldata/:id?', 10098, handleFullDataRequest);

    }
