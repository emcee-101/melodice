import { Song } from "../common_base/data_model.js";


function requestMatcher(req, res) {
  Song.findOne({ name: { $regex: req.params.id, $options: "i" } }, (err, docs) => {
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

export async function matchSong(songName){
  requestMatcher(songName)
}