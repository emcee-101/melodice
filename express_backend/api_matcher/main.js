import { Song } from "../common_base/data_model.js";

export async function requestMatcher(req, res) {
  Song.find({name: { "$regex": req.params.songname, "$options": "i" }})
    .lean().select('_id')
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
        res.status(404);
        res.send({});
      } else {
        res.status(200);
        res.send(docs);
      }
    });
}
