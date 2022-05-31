import express from "express";
import mongoose from "mongoose";
import { Song } from "../common_base/data_model.js";

const DATABASE_URL = "mongodb://root:root@database:27017";
const LISTEN_PORT = 10092;

init_demon();
connectMongoose();

export async function connectMongoose() {
  mongoose.connect(DATABASE_URL);
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.on("open", () => console.log("Matcher connected to Database"));
}

export function init_demon() {
  const app = express();
  app.get("/matcher/:input", function (req, res) {
    requestMatcher(req.params.input, res);
  });
  app.listen(LISTEN_PORT, () => {
    console.log(
      `Matcher Service is listening at http://localhost:${LISTEN_PORT}`
    );
  });
}

function requestMatcher(input, res) {
  Song.findOne({ name: { $regex: input, $options: "i" } }, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(404);
      res.send({});
    } else {
      res.status(200);
      res.send({ id: docs._id });
      console.log(id)
    }
  });
}

export function matchSong(songName){
  requestMatcher(songName)
}