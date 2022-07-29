import React from "react";
import Player from './player.js';
import Card from 'react-bootstrap/Card';

export default function SongElement({index, songData={_id: "bogus"}}) {

    

    return (
        <Card>
            <Card.Body>            
                <Player 
                    index = {index} 
                    songData = {{_id: songData._id}}/>
            </Card.Body>
            <Card.Footer>
                Title: {songData.name}
                Artist: {songData.author}
            </Card.Footer>
        </Card>
    );
}


