import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
  } from "react";
import styled from "styled-components";
import { WaveSurfer, WaveForm } from "wavesurfer-react";
import { standardFetch } from './util/fetch'


const Buttons = styled.div`
  display: inline-block;
`;

const Button = styled.button``;






export default function Player({songData = {_id: "bogus"}}) {

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
        }, []);


    function fetchData(stateID){
        
        let id, answer;
        
        try {

            if (stateID == "bogus" || stateID){

                console.log("initial id: " + songData._id)
    
                // testcase with no songinfos being passed 
                let answerOpt = standardFetch('http://localhost:10092/matcher/Mongoose', "GET");
                id = answerOpt._id
                
                console.log(answerOpt)
    
    
            } else if (stateID) {
    
                id = stateID._id
            
            } else {
    
                console.log("stateID has a incorrect value")
                throw "error with StateID";
    
            }

            console.log("id: " + id)

            answer = standardFetch('http://localhost:10091/audio/' + id, "GET");
            
            console.log("answer:" )
            console.log(answer)

            updateMusicURL(answer.audiourl);


        }
        catch(e) {console.log(e)}
  
    }


    // run only once when component mounted
    useEffect(() => { fetchData(songData._id); }, [songData, fetchData]);

    const play = useCallback(() => {
        console.log(wavesurferRef.current)
        wavesurferRef.current.playPause();
      }, []);

    if (musURL == '') {

            return <div className="Player">Loading...</div>;

      }  else {

            return (<div className="Player">
                        <WaveSurfer onMount={handleWSMount}>
                            <WaveForm id="waveform" />
                                
                        </WaveSurfer>
                        <Buttons>
            
                            <Button onClick={play}>Play / Pause</Button>

                        </Buttons>
                    </div>

    )}
}
