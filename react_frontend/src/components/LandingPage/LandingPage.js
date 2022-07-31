import React, { useEffect, useMemo, useState } from "react"
import Button from "react-bootstrap/Button"
import { useParams, useNavigate } from "react-router-dom"
import {audio_service, IP, ownPort, plannedIP, rapid_api_shazam_host} from "../../util/config"
import { standardFetch } from "../../util/fetch"
 

export default function LandingPage(){

    let parameters = useParams()
    const [id,setID] = useState(parameters.trackid)
    let navigation = useNavigate();
    const [foundStatus,setfoundStatus] = useState("false")


    async function findWithShazam(data){

        let audioBuffer = Buffer.from(data, 'binary').toString('base64')

        let payload = "data:audio/mp3;base64,"+audioBuffer
        
        let shazamResponse = await standardFetch("https://shazam-core.p.rapidapi.com/v1/tracks/recognize","POST",{ payload },{additionalParams: "rapidapi", rapid_api_host: rapid_api_shazam_host})
        
        if(!shazamResponse.detail){

            if(shazamResponse[0] == null){
                // file not found -> its safe
                setfoundStatus("notfound")
            } else {
                setfoundStatus("found")
            }

        }
    }

    async function getAudioCut(){

        let audioResponse = await standardFetch(IP+audio_service+id+"?chop=true","GET",{},{})
        if(!audioResponse.message){


            fetch(audioResponse.audiourl)
                .then(res=>res.blob())
                .then(blob=>{

                    findWithShazam(blob);
                })


        }

    }

    async function renderQR(){

        let base64Data = cache[2].data.base64();

        // convert from base64 to binary probably (internally based on mime type)
        const converted = await fetch(base64Data);

        let qrurl = URL.createObjectURL(new Blob(converted, {type: 'application/pdf'}));
        return qrurl
    }

    async function fetchFromAPIs(givenID){
        
        let myURL, shortenAnswer, qrCodeAnswer;

        if(givenID)
            myURL = encodeURIComponent(plannedIP+ownPort+"landingpage/"+givenID    );
            shortenAnswer = await standardFetch("http://194.94.204.27:10053/tools/shortenurl?url="+myURL,"GET",{},{})
            qrCodeAnswer = await standardFetch("http://194.94.204.27:10053/tools/qrcode?message="+myURL,"GET",{},{})
            console.log(shortenAnswer)
            console.log(qrCodeAnswer)
            console.log(myURL)

            return [myURL, shortenAnswer, qrCodeAnswer]
    }


    const cache = useMemo(()=>{fetchFromAPIs(id)}, [id])
    useEffect(()=>{getAudioCut()})


    if (cache.myURL) 
        return (<div>
            <p>Your Song was created under the id: {parameters.trackid}, Link should be {IP+ownPort+"overview?track="+parameters.trackid}</p><br />
            <a href={cache[1].newUrl}> Shortened Link: {cache[1].newUrl} </a >

            {/* convert base64 qrcode data to a blob and get a link for that and refer the user to that link */}
            <Button onClick={()=>{let url=renderQR(); navigation(url)}}>Display QR Code for your Song</Button>

            {()=>{if(foundStatus == "false"){return "file is being searched by shazam"} else if(foundStatus=="notfound"){return "Your Youtube Ad revenue is safe :)"} else {return "Oh no, your audio will be flagged :("}}}
            
            </div>)
     else { return(
        <>

            {console.log(parameters)}
            {/* Object { trackid: "t" } */}

            <p>Your Song was created under the id: {parameters.trackid}, Link should be {IP+ownPort+"overview?track="+parameters.trackid}</p>
            

        </>
    )}

}