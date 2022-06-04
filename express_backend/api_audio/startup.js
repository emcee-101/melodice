import {initExpressServer,connectMongoose,clearDatabase} from '../common_base/common.js'
import {handleAudioRequests} from './main.js'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'




export function init(){

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    const app = express();
    let port = 10091;

    app.get('/audio/:parameter', function(req, res){handleAudioRequests(req, res)});
  
    //app.get('/audio/file/:parameter', function(req, res){serveAudioFile(req, res)});
    app.use(express.static(__dirname + '/audio_files'));
  
    app.get('/audio_files/:parameter', function(req, res){
      
      console.log(__dirname+'/audio_files/'+req.params.parameter);

      res.sendFile(__dirname+'/audio_files/'+req.params.parameter);
      });
    app.listen(port, () => {
      console.log(`Audio-Service is listening at http://localhost:${port}/audio`);
    });
  
    }


