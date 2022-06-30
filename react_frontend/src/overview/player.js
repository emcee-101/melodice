import React from "react";
import ReactAudioPlayer from 'react-audio-player';





export default function player(props) {

    const [url, setURL] = useState();

    async function getAudioURL(id){

        fetch('194.94.204.27:10091/audio/'+id)
        .then(response => response.json())
        .then(data => {console.log(data); 
                    setURL(data.audiourl)});

    }

    getAudioURL(props.id)

    return (<ReactAudioPlayer
                controls
                src={url} 
            />
    )
}
