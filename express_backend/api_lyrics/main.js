import express from 'express';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose'



export async function connectMongoose() {

    var db = await mongoose.connect('mongodb://root:root@database:27017');
    await mongoose.connection.dropDatabase();
      console.log("Connection Successful!");
     
      // define Schema
      const songSchema = new mongoose.Schema({name: String, type: String, author: Number, lyrics: String, audiofile: String});
   
      // compile schema to model
      const Song = mongoose.model('Song', songSchema); 
   
      // a document instance
      let newSong = new Song({ name: 'I love Mongoose', type: 'l', author: 1, lyrics: 'Hili Hello wir sind alle froh', audiofile: 'amogus.mp3'});
   
      // save model to database
      await newSong.save(function (err, track) {
        if (err) return console.error(err);
        console.log(track.name + " saved to colelction");
        const docs = Song.find();
        console.log(docs);
      });

      let searchForID = '1';
      


      //const query = Song.where({_id: searchForID});
    
      /*await query.findOne(function (err, song) {
        if(err){
          console.log(err);
          return handleError(err);
        }
        if(song){
          console.Log(song.lyrics);
        })*/
      
    
  };

async function requestLyrics(){
    
  // Database Table for a Song is being defined here


  
  await connectMongoose();
  

  searchForID = 1;

  const query = Song.where({_id: searchForID});

  query.findOne(function (err, song) {
    if(err){
      console.log(err);
      return handleError(err);
    }
    if(song){
      console.Log(song.lyrics);
    }
  }
  );
}
