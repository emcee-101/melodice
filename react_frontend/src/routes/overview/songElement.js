import React from "react";
import Player from './player.js';
import Metadata from './metadata.js';

export default function SongElement({songData={_id: "bogus"}}) {

    return (
        <div>
            <Player 
                songData = {{_id: songData._id}}/>
            <Metadata/>
        </div>
    );
}