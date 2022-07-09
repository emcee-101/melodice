import React from "react";
import Player from './player.js';
import Metadata from './metadata.js';

export default function SongElement({key=1, songData={_id: "bogus"}}) {

    return (
        <div>
            <Player 
                songData = {songData._id}/>
            <Metadata/>
        </div>
    );
}