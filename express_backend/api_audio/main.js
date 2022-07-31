import {Song} from "../common_base/data_model.js";
import { IP, LISTEN_PORT } from "./config.js";
import mp3cutter from "mp3cutter"


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

        const cutter = mp3cutter();

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
                    cutter.cut({src: "./audio_files/" + docs.audiofile,
                                target: "./audio_files/"+docs._id+".mp3",
                                start: 1,
                                end: 4})

                    res.send({audiourl: `http://${IP}:${LISTEN_PORT}/audio_files/` + docs.audiofile})

                };
            }
        );

    }
}

