import {handleAudioRequests} from './main.js'
import express from 'express'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cors from "cors"
import { LISTEN_PORT } from "./config.js";




export function init(){

    
    // get directory name to later be able to access folder with songs
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    const app = express();

    app.use(cors());

    // Create API 
    app.get('/audio/:parameter', function(req, res){handleAudioRequests(req, res)});

    
    // Serve Audio Files (http://localhost:10091/audio_files/file.whatever)
    app.use(express.static(__dirname + '/audio_files'));
    app.get('/audio_files/:parameter', function(req, res){
      
      // send audiofile as Response to be displayed in Browser
      res.sendFile(__dirname+'/audio_files/'+req.params.parameter);

      });


    app.listen(LISTEN_PORT, () => {
      console.log(`Audio-Service is listening at http://localhost:${LISTEN_PORT}/audio`);
    });
  
    }


