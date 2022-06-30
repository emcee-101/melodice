import React from "react";
import waveform from 'waveform.js';
import player from 'player.js';
import metadata from 'waveform.js';

export default function songElement(props) {

    if(props.id){

        
    }


    return (
        <div>
            <waveform/>
            <player/>
            <metadata/>
        </div>
    );
}