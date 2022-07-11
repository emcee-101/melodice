import {Song} from "./data_model.js";



 export async function createNewTestSong(){

    let newSong1 = new Song({name: 'I love Mongoose', type: 'both', author: "musicLover507", lyrics: 'Shut up and dance with me', audiofile: 'amogus.mp3'});
  
    let newSong2 = new Song({name: 'Thueringer Kloesse', type: 'both', author: "musicLover507", lyrics: 'ThuereignerKloesse die hab ich gern', audiofile: 'thk.mp3'});
  
    let newSongs = [newSong1, newSong2]

    newSongs.forEach(element => {

      await element.save(function (err, track) {

        if (err) console.log(err);

        });
        
      }); 
    
      Song.find({}).lean().exec(function(err, docs) {
        console.log(docs);

    });

  };
