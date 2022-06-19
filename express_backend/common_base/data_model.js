import mongoose from 'mongoose'

export const  songSchema = new mongoose.Schema({name: String, type: ['audio', 'lyrics', 'both'], author: String, lyrics: String, audiofile: String});
export const Song = mongoose.model('Song', songSchema); 
