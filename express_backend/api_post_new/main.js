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

    let fileNameToBeReferenced = "aaaaaaa";

    if(audioFileData!="Bogus"){
        
        // buffer base64 received from request
        const fileContents = Buffer.from(audioFileData, 'base64');
        console.log(fileContents)
        // find out corresponding filename for data to be written
        const audioFileName = `${getAudioDir()}/${name}.webm`;
        console.log('audiofilename: '+audioFileName);

        fs.writeFile(audioFileName, fileContents, function(err) {

        if(err){console.log(err);}
        else{
            console.log(`file saved to ${audioFileName}`)

            fileNameToBeReferenced = name+'.webm'
            console.log(`the file will be noted in the db as the following name: ${fileNameToBeReferenced}`)
            }
        });
    }

    return fileNameToBeReferenced

}

export async function requestPost(req, res){

    console.log(req.body.name)

    let songData = {name: req.body.name, type: req.body.type, author: req.body.author}
    let resMessage='';
    let intermediateSong = null;

    switch(req.body.typeOfPost){
        // add new Song in DB with only lyrics
        case 'lyrics':
            songData.lyrics = req.body.lyrics;
            break;
        
        // add new Song in DB with only audio
        case 'audio':
            saveAudioFile(req.body.audiodata, req.body.name)
            songData.audiofile = req.body.name+'.webm'
            console.log(songData)
            break;
        
        // add new Song in DB with both
        case 'both':
            saveAudioFile(req.body.audiodata, req.body.name)
            songData.audiofile = req.body.name+'.webm'
            songData.lyrics = req.body.lyrics
            break;

        // add either lyrics or audio to a already existing song
        case 'add':
            
            // find corresponding song
            Song.findOne({_id: req.body.id}, (err,tempSong)=>{

                if(err){
                    console.log('document not found');
                    resMessage='object to be updated not found,'
                }
                else{
                    console.log('document found');
                    switch(req.body.addType){

                        case 'addLyrics':
                            tempSong.lyrics = req.body.lyrics;
                            break;
        
                        case 'addAudio':
                            saveAudioFile(req.body.audiodata, req.body.name)
                            .then(tempSong.audiofile = req.body.name+'.webm')
                            break;
                        
                    }
                    
                    tempSong.type = 'both';
                    intermediateSong = tempSong;

                }
            })


            
            break;
        }
        
        // check if song was marked as a cover on creation 
        // if that is the case add the ID of its entry in the audioDB that was selected on creation
        if(req.body.cover && (req.body.cover == "true")){
            songData.cover = "true";
            songData.audiodbid = req.body.audiodbid;
        } else {
            songData.cover = "false";
        }


        if (intermediateSong) songData = intermediateSong;
        
        console.log(songData)
        let finalObjectSong = new Song(songData);
        console.log(finalObjectSong)
        finalObjectSong.save((err, doc)=>{
            
            if(err){
                console.log("wäh wäh wäh")
                res.status(400).send({message: resMessage+'saving song unsucessful'});
            }
            else{
                console.log('correctly saved document:')
                console.log(doc)
                res.status(200).send({message: resMessage+'saving song sucessful', _id: doc._id});
            }
        })


}