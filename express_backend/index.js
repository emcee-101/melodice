import express from 'express';
import { MongoClient } from 'mongodb';

let collection = null;

const app = express();

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
}

console.log("jojo");


console.log(connect());

console.log("can y'all hear me?");



console.log("TESTTEST");
