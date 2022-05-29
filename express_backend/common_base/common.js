import mongoose from 'mongoose'
import {DATABASE_URL, LISTEN_PORT} from "./config.js"




export async function connectMongoose() {

  await mongoose.connect(DATABASE_URL);
  await mongoose.connection.dropDatabase();
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.on("open", () => console.log("Connected to Database"));
  console.log("LOG: Connection to DB was started");
   
};

export async function clearDatabase() {

  await mongoose.connection.dropDatabase();
  console.log("Database dropped");
   
};

export function initExpressServer(name, url_suffix, port, callback_function){

  const app = express();

  app.get(url_suffix, function(req, res){callback_function(req, res)});



  app.listen(port, () => {
    console.log(`${name} Service is listening at http://localhost:${LISTEN_PORT}/${url_suffix}`);
  });


};
