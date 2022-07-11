import React from "react";
import Player from './player.js';
import Metadata from './metadata.js';

export default function SongElement({index, songData={_id: "bogus"}}) {

    return (
        <div className="track" id={index}>
            <Player 
                index = {index} 
                songData = {{_id: songData._id}}/>
            <Metadata
                index = {index}
                songData = {songData}/>
        </div>
    );
}