import {Song} from "../common_base/data_model.js";
import { IP, LISTEN_PORT } from "./config.js";
import MP3Cutter from  "mp3-cutter"
import path from "path"
import { fileURLToPath } from 'url'


function getAudioPath(){
    
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const __audioDir = path.join(__dirname, 'audio_files');
    console.log('Directory to save songs:'+__audioDir)

    //  /usr/src/app/api_audio/audio_files

    return __audioDir ;
}


export async function handleAudioRequests(req, res){

    let isChopSet = req.query.chop;
    if(isChopSet != "true"){

        Song.findById({_id: req.params.parameter})
        .lean()
        .exec(function(err, docs) {

                //http answer is being sent
                if (err){
                    console.log(err); 
                    res.status(404); 
                    res.send({message: "failed to find song with id" + req.params.parameter})
                }
                else {
                    res.status(200); 

                        //docs.audiofile is filename of requested document

                    res.send({audiourl: `http://${IP}:${LISTEN_PORT}/audio_files/` + docs.audiofile})

                };
            }
        );}
    else {

        const filepath = getAudioPath() + "/"
        


        Song.findById({_id: req.params.parameter})
        .lean()
        .exec(function(err, docs) {

                //http answer is being sent
                if (err){
                    console.log(err); 
                    res.status(404); 
                    res.send({message: "failed to find song with id" + req.params.parameter})
                }
                else {; 
                    
                    if (docs.type != "lyrics"){

                        const srcFilePath = filepath + docs.audiofile
                        const resultFileName = docs._id+".mp3"
                        const resultFilePath = filepath + resultFileName

                            //docs.audiofile is filename of requested document
                        MP3Cutter.cut({src:  srcFilePath  ,
                                    target: resultFilePath ,
                                    start: 1,
                                    end: 4})
                        
                        res.status(200)
                        res.send({audiourl: `http://${IP}:${LISTEN_PORT}/audio_files/` + resultFileName})
                    }

                    else {
                        res.status(404)
                        res.send({message: "this is not a track with a associated audiofile :/"})   }
                };
            }
        );

    }
}

