import { connectMongoose } from "../common_base/common.js";
import {Song} from "../common_base/data_model.js";
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

function testCases(){

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

function getAudioDir(){

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)

    // its best if this solution gets replaced with a less hacky one
    const __rootDir = path.basename(path.dirname(__dirname))
    const __audioDir = __rootDir + '/api_audio/audio_files';

    return __audioDir;
}

async function saveAudioFile(audioFileData, name){
    
    // buffer base64 received from request
    const fileContents = Buffer.from(audioFileData, 'base64');
    
    // find out corresponding filename for data to be written
    const audioFileName = `${getAudioDir()}/${name}.mp3`;
    
    writeFile(audioFileName, fileContents, function(err) {

      if(err)console.log(err);
      console.log(`file saved to ${audioFileName}`)

      let fileNameToBeReferenced = name+'.mp3'
      console.log(`the file will be noted in the db as the following name: ${fileNameToBeReferenced}`)
      return fileNameToBeReferenced
    
    });
}

export async function requestPost(req, res){

    let song, audiofilename, resMessage='';

    switch(req.body.typeOfPost){
        // add new Song in DB with only lyrics
        case lyrics:
            song = new Song({name: req.body.name, type: req.body.type, author: req.body.author, lyrics: req.body.lyrics});
            break;
        
        // add new Song in DB with only audio
        case audio:
            audiofilename = await saveAudioFile(req.body.audiodata, req.body.name);
            song = new Song({name: req.body.name, type: req.body.type, author: req.body.author, audiofile: audiofilename});
            break;
        
        // add new Song in DB with both
        case both:
            audiofilename = await saveAudioFile(req.body.audiodata, req.body.name);
            song = new Song({name: req.body.name, type: req.body.type, author: req.body.author, audiofile: audiofilename, lyrics: req.body.lyrics});
            break;

        // add either lyrics or audio to a already existing song
        case add:
            
            // find corresponding song
            let song = await Song.findOne({_id: req.body.id}, (err)=>{
                if(err){
                    console.log('document not found');
                    resMessage='object to be updated not found,'
                }
            })

            switch(req.body.addType){

                case 'addLyrics':
                    song.lyrics = req.body.lyrics;
                    break;

                case 'addAudio':
                    audiofilename = await saveAudioFile(req.body.audiodata, req.body.name);
                    song.audiofile = audiofilename;
                    break;
                
            }
            
            song.type = 'both';
            
            break;
        }
        
        song.save((err, doc)=>{
            
            if(err){
                res.send(400).send({message: resMessage+'saving song unsucessful'});
            }
            else{
                res.status(200).send({message: resMessage+'saving song sucessful'});
            }
        })


}