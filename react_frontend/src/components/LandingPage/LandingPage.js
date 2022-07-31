import React, { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {audio_service, getfulldata_service, IP, ownPort, plannedIP, rapid_api_shazam_host} from "../../util/config"
import { standardFetch } from "../../util/fetch"
 

export default function LandingPage(){

    let parameters = useParams()
    const [id,setID] = useState(parameters.trackid)
    const [fetchyStatus, setFetchyStatus] = useState(false)

    let navigation = useNavigate();
    const [foundStatus,setfoundStatus] = useState("false")
    let fetchyData = [0,0,0]
    




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
        let audioResponse


            audioResponse = await standardFetch(IP+audio_service+id+"?chop=true","GET",{},{})

            if(!audioResponse.message){


                fetch(audioResponse.audiourl)
                    .then(res=>res.blob())
                    .then(blob=>{

                        findWithShazam(blob);
                    })


            }
        

    }

    async function renderQR(){
        console.log("qrurl")

            if (fetchyData[2]){
                let base64Data = fetchyData[2].data.base64;

                // convert from base64 to binary (internally based on mime type)
                let converted = await fetch(base64Data)
                                    .then(res => res.blob())
                                    .then((res) => {return res});
                console.log(converted)
                let qrurl = URL.createObjectURL(converted.slice(0, converted.size, "application/pdf"))
                console.log(qrurl)
            return qrurl}

            else console.log(" hallo ")
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

            fetchyData = [myURL, shortenAnswer, qrCodeAnswer]
            setFetchyStatus("fetched")
    }

    useEffect(()=>{getAudioCut(); fetchFromAPIs(id)})



    

        return (<div>
            <p>Your Song was created under the id: {parameters.trackid}, Link should be {IP+ownPort+"overview?track="+parameters.trackid}</p><br />
            <a href={fetchyData[1].data.newUrl} style={{ visibility: fetchyStatus ? "visible" : "hidden" }}> Shortened Link: {fetchyData[1].data.newUrl} </a >

            {/* convert base64 qrcode data to a blob and get a link for that and refer the user to that link */}
            <button onClick={()=>{let url=renderQR(); navigation(url)}} style={{ visibility: fetchyStatus ? "visible" : "hidden" }}>Display QR Code for your Song</button>

            <code style={{ visibility: fetchyStatus ? "visible" : "hidden" }}>
                {()=>{if(foundStatus == "false"){return "file is being searched by shazam"} else if(foundStatus=="notfound"){return "Your Youtube Ad revenue is safe :)"} else {return "Oh no, your audio will be flagged :("}}}
            </code >
            </div>)
    
    }

