import express from 'express';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose'




export async function connectMongoose() {

    var db = await mongoose.connect('mongodb://root:root@database:27017');
    await mongoose.connection.dropDatabase();
    console.log("Connection Successful!");
     
  };

export async function requestLyrics(id){
  
    await connectMongoose();
  
    // define Schema for a Song
    var songSchema = new mongoose.Schema({name: String, type: String, author: Number, lyrics: String, audiofile: String});
   
    // compile schema to model
    var Song = mongoose.model('Song', songSchema); 


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

*/ 


  Song.findById({_id: id}).lean().exec(function(err, docs) {
    if (err) console.log(err); return err;
    if (docs) return docs;
  });


};
