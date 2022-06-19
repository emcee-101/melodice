import { connectMongoose } from "../common_base/common.js";
import {Song} from "../common_base/data_model.js";
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'


function getAudioDir(){
    
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const __audioDir = path.join(__dirname, '..', 'api_audio', 'audio_files');
    console.log('Directory to save songs:'+__audioDir)

    //  /usr/src/app/api_audio/audio_files

    return __audioDir;
}

async function saveAudioFile(audioFileData, name){
    
    // buffer base64 received from request
    const fileContents = Buffer.from(audioFileData, 'base64');
    console.log(fileContents)
    // find out corresponding filename for data to be written
    const audioFileName = `${getAudioDir()}/${name}.mp3`;
    console.log('audiofilename: '+audioFileName)

    let fileNameToBeReferenced;
    
    fs.writeFile(audioFileName, fileContents, function(err) {

      if(err){console.log(err);}
      else{
      console.log(`file saved to ${audioFileName}`)

      fileNameToBeReferenced = name+'.mp3'
      console.log(`the file will be noted in the db as the following name: ${fileNameToBeReferenced}`)
        }
    });

    return fileNameToBeReferenced

}

export async function requestPost(req, res){

    console.log(req.body.name)

    let song = {}, audiofilename = '', resMessage='';

    switch(req.body.typeOfPost){
        // add new Song in DB with only lyrics
        case 'lyrics':
            song = new Song({name: req.body.name, type: req.body.type, author: req.body.author, lyrics: req.body.lyrics});
            break;
        
        // add new Song in DB with only audio
        case 'audio':
            saveAudioFile(req.body.audiodata, req.body.name)
            .then(song = new Song({name: req.body.name, type: req.body.type, author: req.body.author, audiofile: req.body.name+'.mp3'}))
            .then(console.log(song))
            break;
        
        // add new Song in DB with both
        case 'both':
            saveAudioFile(req.body.audiodata, req.body.name)
            .then(song = new Song({name: req.body.name, type: req.body.type, author: req.body.author, audiofile: req.body.name+'.mp3', lyrics: req.body.lyrics})) 
            break;

        // add either lyrics or audio to a already existing song
        case 'add':
            
            // find corresponding song
            Song.findOne({_id: req.body.id}, (err,song)=>{

                if(err){
                    console.log('document not found');
                    resMessage='object to be updated not found,'
                }
                else{
                    console.log('document found');
                    switch(req.body.addType){

                        case 'addLyrics':
                            song.lyrics = req.body.lyrics;
                            break;
        
                        case 'addAudio':
                            saveAudioFile(req.body.audiodata, req.body.name)
                            .then(song.audiofile = req.body.name+'.mp3')
                            break;
                        
                    }
                    
                    song.type = 'both';


                }
            })


            
            break;
        }
        
        song.save((err, doc)=>{
            
            if(err){
                res.status(400).send({message: resMessage+'saving song unsucessful'});
            }
            else{
                console.log('correctly saved document:')
                console.log(doc)
                res.status(200).send({message: resMessage+'saving song sucessful'});
            }
        })


}