import React, { useState, useEffect } from "react";
import Player from '../Player/player.js';
import {standardFetch} from '../../util/fetch'
import {rapid_api_audiodb_host} from '../../util/config'


export default function SongElement({index, songData={_id: "bogus"}}) {

    const [dbData, setdbData] = useState(null)

    let lyrics = ""
    if (songData.lyrics) lyrics = "Lyrics: "+songData.lyrics



    async function fetchMetadata(){

        let audioDBresponse

        if(songData.audiodbid && (songData.cover == "true")){
            audioDBresponse = await standardFetch(`https://theaudiodb.p.rapidapi.com/track.php?h=${songData.audiodbid}`, "GET",{}, {type: "rapidapi", rapid_api_host: rapid_api_audiodb_host});

            if((!audioDBresponse.message) && (audioDBresponse.track[0].idAlbum))
                setdbData(audioDBresponse.track[0])
        }
    }

    useEffect(()=>{fetchMetadata()},[])


    if(dbData){

        return (
                <div className="card">
                        <Player 
                            index = {index} 
                            songData = {{_id: songData._id}}/>
                    <div class="container">   
                        <h4><b>{songData.name}</b></h4>                      
                        <p>Artist: {songData.author}</p> 
                        <p>{lyrics}</p>
                        Original Author: {dbData.strArtist}
                        Original Title: {dbData.strTrack}
                        Original Album: {dbData.strAlbum}
                    </div>
                </div>
                )

    } else {


        return (
            <div className="card">
                    <Player 
                        index = {index} 
                        songData = {{_id: songData._id}}/>
                <div class="container">   
                    <h4><b>{songData.name}</b></h4>                      
                    <p>Artist: {songData.author}</p> 
                    <p>{lyrics}</p>
                </div>
            </div>
        )}
}


