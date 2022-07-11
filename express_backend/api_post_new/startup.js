import {initExpressServer,connectMongoose,clearDatabase} from '../common_base/common.js'
import {requestPost} from './main.js'
import express from 'express'
import { LISTEN_PORT } from "./config.js";




function postInitExpressServer(name, url_suffix, port, callback_function){

    const app = express();
    
    // Parse URL-encoded bodies (as sent by HTML forms)
    app.use(express.urlencoded({limit: '50mb'}));

    // Parse JSON bodies (as sent by API clients)
    app.use(express.json({limit: '50mb'}));

    app.post(url_suffix, function(req, res){callback_function(req, res)});
  
  
  
    app.listen(port, () => {
      console.log(`${name} Service is listening at http://localhost:${port}/${url_suffix}`);
    });
  
  
  };
  


export function init()
{
    postInitExpressServer('Poster', '/api_post_new', LISTEN_PORT, requestPost);
};
