import {Song} from "./data_model.js";



 export async function createNewTestSong(){

    let newSong1 = new Song({name: 'I love Mongoose', type: 'both', author: "musicLover507", lyrics: 'Shut up and dance with me', audiofile: 'amogus.mp3'});
  
    let newSong2 = new Song({name: 'Thueringer Kloesse', type: 'audio', author: "musicLover507", lyrics: 'ThuereignerKloesse die hab ich gern', audiofile: 'thk.mp3'});
  
    await newSong1.save(function (err, track) {
      if (err) return console.error(err);
          Song.find({}).lean().exec(function(err, docs) {
            console.log(docs);
          });
        });

  };
