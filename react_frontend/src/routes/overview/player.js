import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
  } from "react";
import styled from "styled-components";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import { standardFetch } from './util/fetch.js'
import { IP, audio_service, matcher_service } from './util/config.js'


const Buttons = styled.div`
  display: inline-block;
`;

const Button = styled.button``;






export default function Player({index, songData }) {

    console.log("1st stop")
    console.log(songData)

    const [musURL, updateMusicURL] = useState('');
    const wavesurferRef = useRef();
    const handleWSMount = useCallback(
        (waveSurfer) => {

            wavesurferRef.current = waveSurfer;

            if (wavesurferRef.current) {

                
                if(musURL){
                    wavesurferRef.current.load(musURL);
                    wavesurferRef.current.on("ready", () => {
                    console.log("WaveSurfer is ready")});
                    wavesurferRef.current.on("loading", (data) => {
                    console.log("loading --> ", data)});
                }

        }
        }, [musURL]);


    async function fetchData(stateID){
        
        let id, answer1, answer2;
        


        try {

            if (stateID) {

                id=stateID
     
            } else {

                console.log("took wrong path")
    
                // testcase with no songinfos being passed 
                answer1 = await standardFetch(IP + matcher_service + 'Mongoose', "GET")
              
                id = answer1[0]._id

            }

            console.log("id: " + id)

            answer2 = await standardFetch(IP + audio_service + id, "GET")


            updateMusicURL(answer2.audiourl);


        }
        catch(e) {console.log(e)}
  
    }


    // run only once when component mounted
    useEffect(() => { console.log("ids:" + songData._id + "   " + index); fetchData(songData._id); }, []);

    const play = useCallback(() => {
        console.log(wavesurferRef.current)
        wavesurferRef.current.playPause();
      }, []);


    var waveFormStyle = {
        "width": "100%",  
        "min-height": "8rem",
        "padding": "0.5rem 0",
      }

    if (musURL == '') {

            return <div className="Player" >Loading...</div>;

      }  else {

            return (<div className="Player" id={index} >
                        <WaveSurfer onMount={handleWSMount}>
                            <WaveForm style={waveFormStyle} id="waveform" cursorColor="transparent" />
                                
                        </WaveSurfer>
                        <Buttons>
            
                            <Button onClick={play}>Play / Pause</Button>

                        </Buttons>
                    </div>

    )}
}
