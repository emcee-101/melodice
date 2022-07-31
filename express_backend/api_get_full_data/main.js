import {Song} from "../common_base/data_model.js";

// get All the Songs with all their attributes
export async function handleFullDataRequest(req, res){

    let result;

    if(req.params.id){
        result = await Song.find({})
                    .lean()
                    .where("_id")
                    .equals(req.params.id);
    } else {
        result = await Song.find({})
                    .lean()
    } 

    if (result) {
        if(result[0] || result._id){
            res.status(200); console.log(result);res.send(result)
        } else {
            console.log(result); res.status(404); res.send({message: 'no docs found idk'});
        }
    } else {
        res.status(505);
        res.send({message: "something went wrong"});
    }

}