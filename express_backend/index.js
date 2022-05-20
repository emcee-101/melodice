import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();

async function connect() {

  const client = new MongoClient('mongodb://root:root@database:27017');

  await client.connect();

  const db = client.db('melodice');
  collection = db.collection('Song');

  if (collection){
      message = "Great Sucess";
    }
    else message = "Oh no";

  return message;
}

console.log("jojo");


console.log(connect());

console.log("can y'all hear me?");
