import React, {
    useCallback,
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

                
                if(musURL != ''){
                    wavesurferRef.current.load(musURL);
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

    async function fetchData(){
        
        let id, answer;
        
        console.log("initial id: " + songData)
        if (songData._id == "bogus"){

            // testcase with no songinfos being passed 
            let answerOpt = standardFetch('http://localhost:10092/matcher/mongoose', "GET");
            id = answerOpt._id
            

        } else {

            id = songData._id
        
        }

        
        console.log("id: " + id)

        answer = standardFetch('http://localhost:10091/audio/' + id, "GET");
        
        console.log("answer:" + answer)

        updateMusicURL(answer.audiourl);

    }

    if (musURL == '') {

            await fetchData();
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
