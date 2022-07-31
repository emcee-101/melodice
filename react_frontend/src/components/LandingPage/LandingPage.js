import React, { useEffect, useMemo, useState } from "react"
import { Button } from "react-bootstrap/lib/InputGroup"
import { useParams } from "react-router-dom"
import {audio_service, IP, ownPort, plannedIP} from "../../util/config"
import { standardFetch } from "../../util/fetch"
import { mp3cutter} from "../../util/lib/simple-mp3-cutter-master"
 

export default function LandingPage(){

    let parameters = useParams()
    const [id,setID] = useState(parameters.trackid)
    let navigation = useNavigate();


    const cache = useMemo(()=>{fetchFromAPIs(id)}, [id])
    //useEffect(fetchFromAPIs(id), [])

    async function findWithShazam(){
        //await standardFetch("http://194.94.204.27:10053/tools/qrcode?message="+myURL,"GET",{},{})
        //shazam

    }

    async function getAudioCut(){

        audioResponse = await standardFetch(IP+audio_service+id,"GET",{},{})
        if(!audioResponse.message){


            fetch(audioResponse.audiourl)
                .then(res=>res.blob())
                .then(blob=>{

                    let cutter = new mp3cutter
                    cutter.cut(blob, 0, 3, findWithShazam);

                })


        }

        await standardFetch("http://194.94.204.27:10053/tools/qrcode?message="+myURL,"GET",{},{})
    }

    function renderQR(){

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

    if (cache.myURL) 
        return (<div>
            <p>Your Song was created under the id: {parameters.trackid}, Link should be {IP+ownPort+"overview?track="+parameters.trackid}</p><br />
            <a href={cache[1].newUrl}> Shortened Link: {cache[1].newUrl} </a >

            {/* convert base64 qrcode data to a blob and get a link for that and refer the user to that link */}
            <Button onClick={()=>{url=renderQR(); navigation(url)}}>Display QR Code for your Song</Button>
            
            </div>)
     else { return(
        <>

            {console.log(parameters)}
            {/* Object { trackid: "t" } */}

            <p>Your Song was created under the id: {parameters.trackid}, Link should be {IP+ownPort+"overview?track="+parameters.trackid}</p>
            

        </>
    )}

}