import {Song} from "../common_base/data_model.js";



export async function handleLyricsRequest(req, res){

  Song.findById({_id: req.params.parameter})
      .exec((err, docs) => {
          if(err){console.log(err); res.status(404); res.send({message: 'Track not found'})}
          else{res.status(200); res.send({lyrics: docs.lean().lyrics})};
       })
       
};



export async function testCase(){

  let newSong = new Song({name: 'Is love Mongoose', type: 'l', author: 1, lyrics: 'Hili Hello wir sind alle froh', audiofile: 'file_example_MP3_1MG.mp3'});

  await newSong.save(function (err, track) {

    if (err) return console.error(err);

        Song.find({}).lean().exec(function(err, docs) {

          console.log(docs);

        });
      });

  
};