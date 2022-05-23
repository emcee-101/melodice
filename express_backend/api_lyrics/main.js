import express from 'express';
import { MongoClient } from 'mongodb';



async function connect() {
    if (collection) {
      return collection;
    }
    const client = new MongoClient('mongodb://root:root@database:27017');
  
    await client.connect();
  
    const db = client.db('melodice');
    collection = db.collection('Song');
  
    let message = null
    if (collection){
        message = "Great Sucess";
      }
      else message = "Oh no";
  
      console.log(message);
      return collection;
  }

export async function requestLyrics(id){
    const collection = await connect();
    const lyricsObj = await collection.findOne({_id: id});


}
