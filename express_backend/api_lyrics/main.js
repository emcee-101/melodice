import express from 'express';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import {Song, songSchema} from './data_model.js'


export async function connectMongoose() {

  var db = await mongoose.connect('mongodb://root:root@database:27017');
  await mongoose.connection.dropDatabase();
  console.log("Connection Successful!");
   
};

function handleLyricsRequest(req, res){

  //await connectMongoose();

  Song.findById({_id: req.params.id}).lean().exec(function(err, docs) {

    if (err){console.log(err); res.status(404); res.send({})}
    else {res.status(200); res.send({lyrics: docs.lyrics})};
    
    }
  );
};


export function expressShizzle(){

  const app = express();

  app.get('/lyrics/:id', function(req, res){handleLyricsRequest(req, res)});
    // /:id means req.params.id is accessible on the other end


  //app.use('/lyrics', LyricsRequestor());

  app.listen(10093, () => {
    console.log('Lyrics Service is listening at http://localhost:10093');
  });


};


export async function testCase(){

  let newSong = new Song({name: 'Is love Mongoose', type: 'l', author: 1, lyrics: 'Hili Hello wir sind alle froh', audiofile: 'amogus.mp3'});

  await newSong.save(function (err, track) {
    if (err) return console.error(err);
        Song.find({}).lean().exec(function(err, docs) {
          console.log(docs);
        });
      });

  
};

export async function requestLyrics(id){
  
    // DEPRECATED

    /*
    // TESTCASE
    // create a document instance
    let newSong = new Song({name: 'Is love Mongoose', type: 'l', author: 1, lyrics: 'Hili Hello wir sind alle froh', audiofile: 'amogus.mp3'});

    await newSong.save(function (err, track) {
      if (err) return console.error(err);
        console.log(track.name + " saved to colelction");
        });


    // TESTCASE PRINT ALL OBJECTS
    // save model to database
    await newSong.save(function (err, track) {
        if (err) return console.error(err);
        console.log(track.name + " saved to colelction");
        const docs = Song.find();
        console.log(docs);
        //Song.find({}, function(err, docs){console.log(docs)});
        
        Song.find({}).lean().exec(function(err, docs) {
          console.log(docs);
        });

        //console.log(all + "hello btw");
      });




  Song.findById({_id: id}).lean().exec(function(err, docs) {
    if (err) console.log(err); return err;
    if (docs) return docs;
  });

*/ 
};
