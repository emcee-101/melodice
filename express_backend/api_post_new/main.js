import { connectMongoose } from "../common_base/common.js";
import {Song} from "../common_base/data_model.js";

async function requestPost(req, res){

    switch(req.body.type){

        case lyrics:
            
            let newSong = new Song({name: req.body.name, type: req.body.type, author: req.body.author, lyrics: req.body.lyrics});
            break;
        case audio:
            break;
        case both:
            break;
        
        }
    }
    //export const  songSchema = new mongoose.Schema({name: String, type: ['audio', 'lyrics', 'both'], author: Number, lyrics: String, audiofile: String});

    let expl1 = {name: 'Amongus Song', type: 'lyrics', author: 'placeholder', lyrics: 'Hallo Welt'}
    let expl2 = {name: 'Amongus Song2',type: 'audio', author: 'placeholder', audio: 'BaseEncoded64'}
    let expl3 = {type: 'audioadd', audio: 'BaseEncoded64', author: 'placeholder', trackid: 'placeholder'}
    let expl4 = {type: 'lyricsadd', lyrics: 'Hallo Welt', author: 'placeholder', trackid: 'placeholder'}
    
    const newSong1 = new Song(expl1);
    const newSong2 = new Song(expl2);
    const newSong3 = new Song(expl3);
    const newSong4 = new Song(expl3);

    newSong1.save();
    newSong2.save();
    newSong3.save();
    newSong4.save();
}