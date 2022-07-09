import {Song} from "../common_base/data_model.js";



export async function handleAudioRequests(req, res){

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

                res.send({audiourl: "http://localhost:10091/audio_files/" + docs.audiofile})

            };
        }
    );
}

