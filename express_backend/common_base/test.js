import {Song} from "./data_model.js";

// Test Data, that is added to display functionalities

 export async function createNewTestSong(){

    let newSong1 = new Song({name: 'I love Mongoose', type: 'both', author: "musicLover507", lyrics: 'Shut up and dance with me', audiofile: 'amogus.mp3', cover: "false"});
  
    let newSong2 = new Song({name: 'Thueringer Kloesse', type: 'both', author: "musicLover507", lyrics: 'ThuereignerKloesse die hab ich gern', audiofile: 'thk.mp3', cover: "false"});
  
    let newSongs = [newSong1, newSong2]

    newSongs.forEach((element) => {

      element.save(function (err, track) {

        if (err) console.log(err)
        else console.log(track)

        });
        
      }); 


  };
