import { connectMongoose } from "../common_base/common.js";
import {Song} from "../common_base/data_model.js";


function testCase(){

    //export const  songSchema = new mongoose.Schema({name: String, type: ['audio', 'lyrics', 'both'], author: Number, lyrics: String, audiofile: String});

    let expl1 = {name: 'Amongus Song', type: 'lyrics', author: 'placeholder', lyrics: 'Hallo Welt'}
    let expl2 = {name: 'Amongus Song2',type: 'audio', author: 'placeholder', audio: 'BaseEncoded64'}
    let expl3 = {type: 'audioadd', audio: 'BaseEncoded64', author: 'placeholder', trackid: 'placeholder'}
    let expl4 = {type: 'lyricsadd', lyrics: 'Hallo Welt', author: 'placeholder', trackid: 'placeholder'}
    
    const newSong1 = new Song(expl1);
    const newSong2 = new Song(expl2);
    const newSong3 = new Song(expl3);
    const newSong4 = new Song(expl4);


}


async function requestPost(req, res){

    let newSong, audiofilename;

    switch(req.body.type){
        case lyrics:
            newSong = new Song({name: req.body.name, type: req.body.type, author: req.body.author, lyrics: req.body.lyrics});
            break;
        case audio:
            audiofilename = saveAudioFile(req.body.audiodata);
            newSong = new Song({name: req.body.name, type: req.body.type, author: req.body.author, audiofile: audiofilename});
            break;
        case both:
            let foundSong = await Song.find({_id: req.body._id}).lean();

            switch(req.body.songType){
                case 'addLyrics':
                    foundSong.lyrics = req.body.lyrics;
                    break;
                case 'createBoth':
                    audiofilename = saveAudioFile(req.body.audiodata);
                    newSong = new Song({name: req.body.name, type: req.body.type, author: req.body.author, audiofile: audiofilename, lyrics: req.body.lyrics});
                    break;
                case 'addSong':
                    audiofilename = saveAudioFile(req.body.audiodata);
                    newSong = new Song({name: req.body.name, type: req.body.type, author: req.body.author, lyrics: req.body.lyrics});
                    break;
            } 

            break;
        }

        if(newSong){

            await newSong.save();
            res.status(200).send({message: 'saving song sucessful'});
        
        }
        else{

            res.send(400).send({message: 'saving song unsucessful'});

        }



}