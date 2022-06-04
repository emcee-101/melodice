import fs from 'fs'
import mongoose from 'mongoose'
import {connectMongoose} from '../common_base/common.js'
import {Song} from "../common_base/data_model.js";





export async function handleAudioRequests(req, res){

    // Check State of Database to implement logic to initialize mongoose only once if necessary
    console.log(mongoose.connection.readyState);

    if(mongoose.connection.readyState == 0 || mongoose.connection.readyState == 3){

        connectMongoose();

    }

    let audioFileName;

    Song.findById({_id: req.params.parameter})
    .lean()
    .exec(function(err, docs) {

        if (err){console.log(err); res.status(404); res.send({})}

        //get file name of sound file of wanted ID
        else {audioFileName = docs.audioFile};

        }


    );



        //http answer is being sent
    res.status(200); res.send({audiofile: audioFileName});




}


export async function serveAudioFile(req, res){

    console.log("The name of the directory were currently in is: " + __dirname);

    let audioFile = fs.readFileSync(__dirname + "/audio_files/" + audioFileName)

    res.status(200); res.send({audiofile: file});

}
