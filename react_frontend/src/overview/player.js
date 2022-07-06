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
import useFetch from "react-fetch-hook"



const Buttons = styled.div`
  display: inline-block;
`;

const Button = styled.button``;
let songid;




fetch("http://backend:10092/matcher/mongoose")
.then(response => response.json())
.then(data => {console.log(data); 
             songid = data._id;
            console.log(songid)})
.catch(e => console.log(e));

export default function Player(props) {

    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        (waveSurfer) => {
        wavesurferRef.current = waveSurfer;


        if (wavesurferRef.current) {
/*
            getAudioURL()
            .then(wavesurferRef.current.load(url))
            .then(wavesurferRef.current.on("ready", () => {
                console.log("WaveSurfer is ready");
            }))
            .then(wavesurferRef.current.on("loading", (data) => {
                console.log("loading --> ", data);
            }));*/
            

                    
            if(data2){
                wavesurferRef.current.load(data2);
                wavesurferRef.current.on("ready", () => {
                    console.log("WaveSurfer is ready")});
                wavesurferRef.current.on("loading", (data) => {
                    console.log("loading --> ", data)});
                }

        }
    }
    );

    const play = useCallback(() => {
        console.log(wavesurferRef.current)
        wavesurferRef.current.playPause();
      });

    if (isLoading || isLoading2) {
        return <div className="Player">Loading...</div>;
      }  
    
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
