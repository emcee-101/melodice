import {Song} from "../common_base/data_model.js";



export async function handleLyricsRequest(req, res){

  Song.findById({_id: req.params.parameter})
      .lean()
      .exec(function(err, docs) {

        //http answer is being sent
          if (err){console.log(err); res.status(404); res.send({})}

          else {res.status(200); res.send({lyrics: docs.lyrics})};
    
      }
    );
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