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

async function saveAudioFile(){}

export async function requestPost(req, res){

    let song, audiofilename;

    switch(req.body.typeOfPost){
        // add new Song in DB with only lyrics
        case lyrics:
            song = new Song({name: req.body.name, type: req.body.type, author: req.body.author, lyrics: req.body.lyrics});
            break;
        
        // add new Song in DB with only audio
        case audio:
            audiofilename = saveAudioFile(req.body.audiodata);
            song = new Song({name: req.body.name, type: req.body.type, author: req.body.author, audiofile: audiofilename});
            break;
        
        // add new Song in DB with both
        case both:
            audiofilename = saveAudioFile(req.body.audiodata);
            song = new Song({name: req.body.name, type: req.body.type, author: req.body.author, audiofile: audiofilename, lyrics: req.body.lyrics});
            break;

        // add either lyrics or audio to a already existing song
        case add:
            
            // find corresponding song
            let doc = await Song.findOne({_id: req.body.id});

            switch(req.body.addType){

                case 'addLyrics':
                    doc.lyrics = req.body.lyrics;
                    break;
                case 'addAudio':
                    audiofilename = saveAudioFile(req.body.audiodata);
                    doc.audiofile = audiofilename;
                    break;
                
            }

            doc.type = 'both';
            song = doc;

            break;
        }
        
        song.save((err, doc)=>{
            
            if(err){
                res.send(400).send({message: 'saving song unsucessful'});
            }
            else{
                res.status(200).send({message: 'saving song sucessful'});
            }
        })


}