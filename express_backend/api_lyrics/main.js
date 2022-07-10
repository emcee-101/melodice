import {Song} from "../common_base/data_model.js";



export async function handleLyricsRequest(req, res){

  Song.findById({_id: req.params.parameter})
      .exec((err, docs) => {
          if(err){console.log(err); res.status(404); res.send({message: 'Track not found'})}
          else{res.status(200); res.send({lyrics: docs.lean().lyrics})};
       })
       
};

