import {Song} from "../common_base/data_model.js";

// get All the Songs with all their attributes
export async function handleFullDataRequest(req, res){

    Song.find({})
    .exec((err, docs) => {
        if(err){console.log(err); res.status(404); res.send({message: 'no docs found idk'})}
        else{res.status(200); res.send(docs.lean())};
     })


}