import {Song} from "./data_model.js";



 export async function createNewTestSong(){

    let newSong = new Song({name: 'Is love Mongoose', type: 'l', author: 1, lyrics: 'Hili Hello wir sind alle froh', audiofile: 'amogus.mp3'});
  
    await newSong.save(function (err, track) {
      if (err) return console.error(err);
          Song.find({}).lean().exec(function(err, docs) {
            console.log(docs);
          });
        });

  };
