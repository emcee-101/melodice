import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    useMemo
  } from "react";
import ReactAudioPlayer from 'react-audio-player';
import styled from "styled-components";
import { WaveSurfer, WaveForm, Region, Marker } from "wavesurfer-react";




const Buttons = styled.div`
  display: inline-block;
`;

const Button = styled.button``;
let songid = '';


export default function Player(props) {

    const [url, setURL] = useState();

    async function getAudioURL(){

        fetch('localhost:10092/matcher/mongoose')
        .then(response => response.json())
        .then(data => {console.log(data); 
                    songid = data._id});

        fetch('localhost:10091/audio/'+songid)
        .then(response => response.json())
        .then(data => {console.log(data); 
                    setURL(data.audiourl)});

    }

    getAudioURL()


    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        (waveSurfer) => {
        wavesurferRef.current = waveSurfer;


        if (wavesurferRef.current) {

            wavesurferRef.current.load(url);

            wavesurferRef.current.on("ready", () => {
                console.log("WaveSurfer is ready");
            });

            wavesurferRef.current.on("loading", (data) => {
                console.log("loading --> ", data);
            });
        }
    }
    );

    const play = useCallback(() => {
        console.log(wavesurferRef.current)
        wavesurferRef.current.playPause();
      });

    return (<div className="Player">
                <WaveSurfer onMount={handleWSMount}>
                    <WaveForm id="waveform" />
                        
                </WaveSurfer>
                <Buttons>
      
                    <Button onClick={play}>Play / Pause</Button>

                </Buttons>
            </div>
    )
}
