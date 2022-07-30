import React, { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import {IP, ownPort, plannedIP} from "../../util/config"
import { standardFetch } from "../../util/fetch"
 

export default function LandingPage({match}){

    let parameters = useParams()
    const [id,setID] = useState(parameters.trackid)

    const cache = useMemo(()=>{fetchFromAPIs(id)}, [id])
    //useEffect(fetchFromAPIs(id), [])

    async function fetchFromAPIs(givenID){
        
        let myURL, shortenAnswer, qrCodeAnswer;

        if(givenID)
            myURL = encodeURIComponent(plannedIP+ownPort+"landingpage/"+givenID    );
            shortenAnswer = await standardFetch("http://194.94.204.27:10053/tools/shortenurl?url="+myURL,"GET",{},{})
            qrCodeAnswer = await standardFetch("http://194.94.204.27:10053/tools/qrcode?message="+myURL,"GET",{},{})
            console.log(shortenAnswer)
            console.log(qrCodeAnswer)
            console.log(myURL)
    }

    return(
        <>

            {console.log(parameters)}
            {/* Object { trackid: "t" } */}

            <p>Your Song was created under the id: {parameters.trackid}, Link should be {IP+ownPort+"overview?track="+parameters.trackid}</p>
            

        </>
    )

}