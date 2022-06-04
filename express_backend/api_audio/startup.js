import {initExpressServer,connectMongoose,clearDatabase} from '../common_base/common.js'
import {handleAudioRequests,serveAudioFile} from './main.js'
import express from 'express'



export function init(){

    const app = express();
    let port = 10091;

    app.get('/audio/:parameter', function(req, res){handleAudioRequests(req, res)});
  
    app.get('/audio/file/:parameter', function(req, res){serveAudioFile(req, res)});
  
  
    app.listen(port, () => {
      console.log(`Audio-Service is listening at http://localhost:${port}/audio`);
    });
  
    }


